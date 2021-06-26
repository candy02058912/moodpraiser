import axios from "axios";

export const queryPraise = (habitID: string, uid: string) => {
  var data = JSON.stringify({
    operation: "search_by_hash",
    schema: "dev",
    table: "praises",
    hash_values: [`${uid}-${habitID}`],
    get_attributes: ["id"],
  });

  return axios({ data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

export const createPraise = (habitID: string, uid: string) => {
  var data = JSON.stringify({
    operation: "upsert",
    schema: "dev",
    table: "praises",
    records: [
      {
        id: `${uid}-${habitID}`,
        habit_id: habitID,
        uid: uid,
      },
    ],
  });

  return axios({ data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};
