import "dotenv/config";
import { argv } from "node:process";
import { availableParallelism } from "node:os";
import cluster from "node:cluster";
import { server } from "./server";

const PORT = Number(process.env.PORT) || 4000;
const HOST = "localhost";

const args = argv.slice(2);

const isMulti = !!args.find((arg) => arg === "--multi");

const cores = availableParallelism();

if (cluster.isPrimary) {
  server.listen(PORT, HOST, () => {
    console.log(`Primary. Listen on port ${PORT}`);
  });

  if (isMulti) {
    Array.from({ length: cores - 1 })
      .map((_, index) => index + 1)
      .forEach((processId) => {
        cluster.fork({ PORT: PORT + processId });
      });
  }
} else {
  server.listen(PORT, HOST, () => {
    console.log(`Worker. Listen on port ${PORT}`);
  });
}
