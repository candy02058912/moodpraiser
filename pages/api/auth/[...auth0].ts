import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthError, MISMATCHED_PROVIDER } from "../../../common/errors/auth";
import { DBUser } from "../../../common/types";
import { extractProvider } from "../../../common/utils/auth";
import { createUser, queryUserByEmail } from "../../../server/api/users";

const afterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { user } = session;
  const dbUserQuery: DBUser[] = await queryUserByEmail(user.email);
  let dbUser: DBUser;
  if (dbUserQuery.length === 0) {
    const resp = await createUser(user);
    dbUser = { uid: resp.inserted_hashes[0] };
  } else {
    dbUser = dbUserQuery[0];
    if (dbUser.provider !== extractProvider(user.sub)) {
      throw new AuthError(
        MISMATCHED_PROVIDER.message,
        MISMATCHED_PROVIDER.code
      );
    }
  }
  user.uid = dbUser.uid;
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
