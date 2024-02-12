import { DataBase } from "../models/users";
import { users, newUserData } from "./mocks/users";
import { User } from "../types/types";

describe("DataBase instance", () => {
  it("getAllUsers returns user list", async () => {
    const db = new DataBase(users);

    expect(await db.getAllUsers()).toStrictEqual(users);
  });

  it("getUserById returns user list if id correct", async () => {
    const db = new DataBase(users);
    const user = users[0] as User;
    const { id } = user;

    expect(await db.getUserById(id)).toStrictEqual([user]);
  });

  it("getUserById returns empty list if id incorrect", async () => {
    const db = new DataBase(users);
    const id = "incorrect-id";

    expect(await db.getUserById(id)).toStrictEqual([]);
  });

  it("createUser returns new user", async () => {
    const db = new DataBase(users);
    const user = await db.createUser(newUserData);

    expect(newUserData).toStrictEqual(user);
  });

  it("updateUser updates existing user", async () => {
    const db = new DataBase(users);
    const user = users[0] as User;
    const { id } = user;

    const updatedUser = await db.updateUser(id, newUserData);

    const userFromDB = await db.getUserById(id);

    expect(userFromDB).toStrictEqual([updatedUser]);
  });

  it("removeUser delete existing user", async () => {
    const db = new DataBase(users);
    const user = users[0] as User;
    const { id } = user;

    await db.removeUser(id);

    const userFromDB = await db.getUserById(id);

    expect(userFromDB).toStrictEqual([]);
  });
});
