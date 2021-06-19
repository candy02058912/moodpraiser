import axios from "axios";
import SQLString from "sqlstring";
import { DBUser } from "../../common/types";

export const queryHabitsByUID = (uid: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(`SELECT * FROM dev.habits WHERE owner = ?`, [uid]),
  });

  return axios({ data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export const createHabit = (name: string, uid: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(
      `INSERT INTO dev.habits (name, owner) VALUES (?, ?)`,
      [name, uid]
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
