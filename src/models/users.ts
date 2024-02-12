import type { User, UserData } from "types/types";
import { randomUUID } from "node:crypto";

class DataBase {
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
      const newUser: User = Object.assign({ id: randomUUID() }, userData);
      this.users.push(newUser);
      resolve(newUser);
    });
  }
}

export const db = new DataBase();
