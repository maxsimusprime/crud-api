import "dotenv/config";
import { createServer } from "node:http";
import { argv } from "node:process";
import { read } from "./controllers/read";
import { create } from "./controllers/create";

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

const args = argv.slice(2);

const isMulti = !!args.find((arg) => arg === "--multi");

if (!isMulti) {
  const server = createServer((request, response) => {
    try {
      const { url, method } = request;

      if (!url?.startsWith("/api/users")) {
        response.statusCode = 404;
        response.statusMessage = "Invalid API Endpoint Route";
        response.end();
      } else {
        switch (method) {
          case "GET":
            read(request, response);
            break;
          case "POST":
            create(request, response);
            break;
          case "PUT":
            break;
          case "DELETE":
            break;
          default:
            response.statusCode = 405;
            response.statusMessage = "Invalid API request method";
            response.end();
            break;
        }
      }
    } catch (error) {
      response.statusCode = 500;
      response.statusMessage = "Internal Server Error";
      response.end();
    }
  });

  server.listen(PORT, HOST, () => {
    console.log(`Listen on port ${PORT}`);
  });
}
