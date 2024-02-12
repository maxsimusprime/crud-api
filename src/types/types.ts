import type { IncomingMessage, ServerResponse } from "node:http";

export type Controller = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => void;

type uuid = string;

export type User = {
  id: uuid;
  username: string;
  age: number;
  hobbies: string[];
};
