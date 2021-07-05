import axios from "axios";
import { sortBy } from "lodash";
import SQLString from "sqlstring";

export const queryHabitsByUID = (uid: string, { withRecord = false } = {}) => {
  let query = SQLString.format(`SELECT * FROM dev.habits WHERE owner = ?`, [
    uid,
  ]);

  if (withRecord) {
    query = SQLString.format(
      `
    SELECT h.id, h.name, h.__createdtime__ as create_time, h.completed, h.praised, r.mood, r.__createdtime__ as record_create_time FROM dev.habits as h
    LEFT JOIN dev.records as r
    ON r.habit_id = h.id
    WHERE owner = ?
    ORDER BY record_create_time
    `,
      [uid]
    );
  }

  const data = JSON.stringify({
    operation: "sql",
    sql: query,
  });

  return axios({ data })
    .then(function (response) {
      if (withRecord) {
        return sortBy(
          response.data.reduce(
            (
              result: { [key: string]: any },
              value: { [key: string]: any },
              key: string
            ) => {
              if (!result[value.id]) {
                result[value.id] = {
                  id: value.id,
                  name: value.name,
                  completed: value.completed,
                  praised: value.praised,
                  records: {},
                };
              }
              if (value.record_create_time) {
                result[value.id].records[value.record_create_time] = {
                  mood: value.mood,
                };
              }
              return result;
            },
            {}
          ),
          "create_time"
        );
      }
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export const queryHabitByHabitID = (habitID: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(
      `
    SELECT h.id, h.name, u.name as owner_name FROM dev.habits as h
    JOIN dev.users as u
    ON h.owner = u.uid
    WHERE h.id = ?;
    `,
      [habitID]
    ),
  });
  return axios({ data })
    .then(function (response) {
      if (response.data.length === 0) {
        return {};
      }
      return response.data[0];
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export const createHabit = (name: string, uid: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(
      `INSERT INTO dev.habits (name, owner, completed, praised) VALUES (?, ?, 0, 0)`,
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

export const updateHabit = async (
  habitID: string,
  type: "praised" | "completed"
) => {
  let query = SQLString.format(`SELECT ${type} FROM dev.habits WHERE id = ?`, [
    habitID,
  ]);
  let data = JSON.stringify({
    operation: "sql",
    sql: query,
  });
  let resp = await axios({ data });
  const updateValue = (resp.data[0][type] || 0) + 1;
  data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(`UPDATE dev.habits SET ${type} = ? WHERE id = ?`, [
      updateValue,
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

export const deleteHabit = async (habitID: string, uid: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(`DELETE FROM dev.habits WHERE id = ? AND owner = ?`, [
      habitID,
      uid,
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
