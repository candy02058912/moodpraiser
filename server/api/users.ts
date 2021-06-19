import axios from "axios";
import SQLString from "sqlstring";

axios.defaults.baseURL = process.env.HARPERDB_URL;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${process.env.HARPERDB_KEY}`,
};
axios.defaults.method = "POST";

export const queryUserByEmail = (email: string) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(`SELECT * FROM dev.users WHERE email = ?`, [email]),
  });

  return axios({ data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export const createUser = (user: any) => {
  const data = JSON.stringify({
    operation: "sql",
    sql: SQLString.format(
      `INSERT INTO dev.users (email, name, provider, last_login_time) VALUES (?, ?, ?, ?)`,
      [user.email, user.name, user.sub.split("|")[0], new Date().getTime()]
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
