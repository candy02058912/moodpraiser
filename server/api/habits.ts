import axios from "axios";
import { reduce, sortBy } from "lodash";
import SQLString from "sqlstring";

export const queryHabitsByUID = (uid: string, { withRecord = false } = {}) => {
  let query = SQLString.format(`SELECT * FROM dev.habits WHERE owner = ?`, [
    uid,
  ]);

  if (withRecord) {
    query = SQLString.format(
      `
    SELECT r.mood, r.__createdtime__ as record_create_time , name, h.id, h.__createdtime__ as create_time FROM dev.habits as h
    JOIN dev.records as r
    ON r.habit_id = h.id
    WHERE owner = ?
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
          response.data.reduce((result, value, key) => {
            (
              result[value.id] ||
              (result[value.id] = {
                id: value.id,
                name: value.name,
                records: { [value.record_create_time]: { mood: value.mood } },
              })
            ).records[value.record_create_time] = { mood: value.mood };
            return result;
          }, {}),
          "create_time"
        );
      }
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
