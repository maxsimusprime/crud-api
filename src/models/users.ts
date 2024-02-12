import type { User } from "types/types";

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
}

export const db = new DataBase();
