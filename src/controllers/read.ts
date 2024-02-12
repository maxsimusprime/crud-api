import type { Controller } from "types/types";
import { db } from "../models/users";

export const read: Controller = async (request, response) => {
  if (request.url?.match(/^\/api\/users$/)) {
    const users = await db.getAllUsers();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(users));
    response.end();
    return;
  }

  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
    const id = request.url.split('/')[3];
    
    if (id) {
      const users = await db.getUserById(id);

      if (users.length > 0) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(users[0]));
        response.end();
        return;
      }

      response.statusCode = 404;
      response.statusMessage = "User With Provided Id Not Found";
      response.end();
      return;
    }
  }

  response.statusCode = 400;
  response.statusMessage = "Invalid User Id or User Id Was Not Provided";
  response.end();
};
