import type { Controller } from "types/types";
import { db } from "../models/users";

export const remove: Controller = async (request, response) => {
  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
    const id = request.url.split("/")[3];

    if (id) {
      const users = await db.getUserById(id);

      if (users.length > 0) {
        await db.removeUser(id);

        response.writeHead(204, "OK");
        response.end(
          JSON.stringify({ message: `User Was Deleted` })
        );
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
