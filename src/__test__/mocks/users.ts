import type { User, UserData } from "types/types";

export const users: User[] = [
  {
    id: "03daabd8-59a6-4ab5-bea4-6cc5fc5b5cb5",
    username: "Alex",
    age: 20,
    hobbies: ["darts"],
  },
  {
    id: "d0b78099-7cdc-44eb-a3ae-b2f35b3ffb70",
    username: "John",
    age: 21,
    hobbies: ["piano", "running"],
  },
];

export const newUserData: UserData = {
  username: "Mike",
  age: 22,
  hobbies: ["boxing"],
};
