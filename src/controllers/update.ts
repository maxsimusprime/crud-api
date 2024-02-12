import type { Controller, UserData } from "types/types";
import { db } from "../models/users";
import { isUserDataValid } from "../utils/isUserDataValid";

export const update: Controller = async (request, response) => {
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
              response.writeHead(200, { "Content-Type": "application/json" });
              response.write(JSON.stringify(user));
              response.end();
            })
            .catch(() => {
              response.writeHead(400, "Invalid Request");
              response.end(
                JSON.stringify({ message: "Body Doesn't Contain Required Fields" })
              );
            });
        });
      } else {
        response.writeHead(404, "Not Found");
        response.end(
          JSON.stringify({ message: "User With Provided Id Not Found" })
        );
      }
    }
  } else {
    response.writeHead(400, "Invalid Request");
    response.end(
      JSON.stringify({ message: "Invalid User Id or User Id Was Not Provided" })
    );
  }
};
