import "dotenv/config";
import { createServer } from "node:http";
import { read } from "./controllers/read";
import { create } from "./controllers/create";
import { update } from "./controllers/update";
import { remove } from "./controllers/remove";

export const server = createServer((request, response) => {
  try {
    const { url, method } = request;

    if (!url?.startsWith("/api/users")) {
      response.writeHead(404, "Not Found");
      response.end(JSON.stringify({ message: "Invalid API Endpoint Route" }));
    } else {
      switch (method) {
        case "GET":
          read(request, response);
          break;
        case "POST":
          create(request, response);
          break;
        case "PUT":
          update(request, response);
          break;
        case "DELETE":
          remove(request, response);
          break;
        default:
          response.writeHead(405, "Invalid Request");
          response.end(
            JSON.stringify({ message: "Invalid API request method" })
          );
          break;
      }
    }
  } catch (error) {
    response.writeHead(500, "Server Error");
    response.end(JSON.stringify({ message: "Internal Server Error" }));
  }
});
