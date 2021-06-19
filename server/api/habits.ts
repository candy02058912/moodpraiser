import axios from "axios";
import SQLString from "sqlstring";

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
