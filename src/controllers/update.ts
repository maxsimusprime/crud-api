import type { Controller, UserData } from "types/types";
import { db } from "../models/users";
import { isUserDataValid } from "../utils/isUserDataValid";

export const update: Controller = async (request, response) => {
  if (request.url?.match(/^\/api\/users$/)) {
    const users = await db.getAllUsers();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(users));
    response.end();
    return;
  }

  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
    const id = request.url.split("/")[3];

    if (id) {
      const users = await db.getUserById(id);

      if (users.length > 0) {
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
              const user = await db.updateUser(id, {
                username: userData.username,
                age: userData.age,
                hobbies: userData.hobbies,
              });
              return user;
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
        response.statusCode = 404;
        response.statusMessage = "User With Provided Id Not Found";
        response.end();
      }
    }
  } else {
    response.statusCode = 400;
    response.statusMessage = "Invalid User Id or User Id Was Not Provided";
    response.end();
  }
};
