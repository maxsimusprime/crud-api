import type { Controller } from "types/types";
import { db } from "../models/users";

export const remove: Controller = async (request, response) => {
  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
    const id = request.url.split("/")[3];

    if (id) {
      const users = await db.getUserById(id);

      if (users.length > 0) {
        await db.removeUser(id);

        response.statusCode = 204;
        response.statusMessage = "User Was Deleted";
        response.end();
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
