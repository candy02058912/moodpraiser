import axios from "axios";
import SQLString from "sqlstring";
import { Record } from "../../common/types";

export const queryRecordsByHabitID = (habitID: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(`SELECT * FROM dev.records WHERE habit_id = ?`, [
      habitID,
    ]),
  });

  return axios({ data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export const createRecord = (req: Record) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(
      `INSERT INTO dev.records (uid, habit_id, mood) VALUES (?, ?, ?)`,
      [req.uid, req.habit_id, req.mood]
    ),
  });

  return axios({ data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};
