import { withApiAuthRequired, getSession, Session } from "@auth0/nextjs-auth0";
import { Record } from "../../common/types";
import { updateHabit } from "../../server/api/habits";
import { createRecord } from "../../server/api/records";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = getSession(req, res) as Session;
  switch (req.method) {
    case "POST":
      const { body }: { body: Record } = req;
      await updateHabit(body.habit_id, "completed");
      const resp = await createRecord({ ...body, uid: user.uid });
      res.json({ id: resp.inserted_hashes[0] });
      break;
    default:
      res.status(405).json({
        error: "method_not_allowed",
        description: `${req.method} method not allowed`,
      });
  }
});
