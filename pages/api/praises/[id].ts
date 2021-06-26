import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { queryPraise } from "../../../server/api/praises";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  const habitID = req.url!.split("/")[3];
  switch (req.method) {
    case "GET":
      const habit = await queryPraise(habitID, user.uid);
      res.json(habit);
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
  }
});
