import type { User, UserData } from "types/types";
import { randomUUID } from "node:crypto";

export class DataBase {
  private users: User[];

  constructor(users?: User[]) {
    this.users = users || [];
  }

  public async getAllUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  public async getUserById(id: string): Promise<User[]> {
    return Promise.resolve(this.users.filter((user) => user.id === id));
  }

  public async createUser(userData: UserData): Promise<User> {
    return new Promise((resolve) => {
      const newUser: User = Object.assign(userData, { id: randomUUID() });
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  public async updateUser(id: string, userData: UserData): Promise<User> {
    return new Promise((resolve) => {
      const newUser: User = { ...userData, id };
      this.users = this.users.map((user) =>
        user.id === newUser.id ? newUser : user
      );
      resolve(newUser);
    });
  }

  public async removeUser(id: string): Promise<void> {
    return Promise.resolve().then(() => {
      this.users = this.users.reduce(
        (acc: User[], user: User) => (user.id !== id ? [...acc, user] : acc),
        []
      );
    });
  }
}

export const db = new DataBase();
