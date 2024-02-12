import { db } from "../models/users";
import type { Controller, UserData } from "types/types";

export const create: Controller = async (request, response) => {
  if (request.url?.match(/^\/api\/users$/)) {
    let body = "";

    request.on("data", (chunk) => (body += chunk.toString()));
    request.on("end", async () => {
      console.log("Body: ", body);
      await Promise.resolve(JSON.parse(body) as UserData)
        .then((userData) => {
          if (
            userData instanceof Object &&
            "username" in userData &&
            typeof userData.username === "string" &&
            "age" in userData &&
            typeof userData.age === "number" &&
            "hobbies" in userData &&
            userData.hobbies instanceof Array
          ) {
            if (
              userData.hobbies.filter((el) => typeof el !== "string").length > 0
            ) {
              throw new Error();
            }
            return userData as UserData;
          } else {
            throw new Error();
          }
        })
        .then(async (userData) => {
          const newUser = await db.createUser(userData);
          return newUser;
        })
        .then((user) => {
          response.writeHead(201, { "Content-Type": "application/json" });
          response.write(JSON.stringify(user));
          response.end();
        })
        .catch(() => {
          response.statusCode = 400;
          response.statusMessage = "Body Doesn't Contain Required Fields";
          response.end();
        });
    });
  } else {
    response.statusCode = 400;
    response.statusMessage = "Invalid API Endpoint URL";
    response.end();
  }
};
