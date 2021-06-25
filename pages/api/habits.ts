import { withApiAuthRequired, getSession, Session } from "@auth0/nextjs-auth0";
import { createHabit, queryHabitsByUID } from "../../server/api/habits";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  switch (req.method) {
    case "GET":
      const habits = await queryHabitsByUID(user.uid, { withRecord: true });
      res.json({ habits });
      break;
    case "POST":
      const {
        body: { name },
      } = req;
      const resp = await createHabit(name as string, user.uid);
      res.json({ id: resp.inserted_hashes[0] });
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
  }
});
