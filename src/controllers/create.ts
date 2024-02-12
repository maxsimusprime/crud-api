import { db } from "../models/users";
import type { Controller, UserData } from "types/types";
import { isUserDataValid } from "../utils/isUserDataValid";

export const create: Controller = async (request, response) => {
  if (request.url?.match(/^\/api\/users$/)) {
    let body = "";

    request.on("data", (chunk) => (body += chunk.toString()));
    request.on("end", async () => {
      await new Promise((resolve, reject) => {
        try {
          const userData = JSON.parse(body) as UserData;
          resolve(userData);
        } catch (error) {
          reject(new Error());
        }
      })
        .then((userData) => {
          if (isUserDataValid(userData)) {
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
