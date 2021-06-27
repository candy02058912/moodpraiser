import { getSession, Session, withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  queryHabitByHabitID,
  updateHabit,
} from "../../../../server/api/habits";
import { createPraise } from "../../../../server/api/praises";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  const habitID = req.url!.split("/")[3];
  switch (req.method) {
    case "GET":
      const habit = await queryHabitByHabitID(habitID);
      res.json(habit);
      break;
    case "POST":
      await updateHabit(habitID, "praised");
      const resp = await createPraise(habitID, user.uid);
      res.json({ id: resp.upserted_hashes[0] });
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
  }
});
