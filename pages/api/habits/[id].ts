import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { deleteHabit } from "../../../server/api/habits";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  const habitID = req.url!.split("/")[3];
  switch (req.method) {
    case "DELETE":
      const resp = await deleteHabit(habitID, user.uid);
      res.json({ id: resp.deleted_hashes[0] });
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
  }
});
