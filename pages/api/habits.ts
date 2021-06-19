import { withApiAuthRequired, getSession, Session } from "@auth0/nextjs-auth0";
import { queryHabitsByUID } from "../../server/api/habits";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  if (req.method === "GET") {
    const habits = await queryHabitsByUID(user.uid);
    res.json({ habits });
  } else {
    res.status(405).json({
      error: "method_not_allowed",
      description: `${req.method} method not allowed`,
    });
  }
});
