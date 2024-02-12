import "dotenv/config";
import { argv } from "node:process";
import { availableParallelism } from "node:os";
import cluster from "node:cluster";
import { join } from "node:path";

const PORT = Number(process.env.PORT) || 4000;

const args = argv.slice(2);

const isMulti = !!args.find((arg) => arg === "--multi");

const cores = availableParallelism();

cluster.setupPrimary({
  exec: join(__dirname, "server"),
});

if (isMulti) {
  Array.from({ length: cores }).forEach((_, index) => {
    cluster.fork({ PORT: PORT + index });
  });
} else {
  cluster.fork();
}
