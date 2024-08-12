import { UserInput } from "../dto/user-input";
import { users } from "../models/user-model";
export class UserRepository {
  constructor() {}

  async createAccount({ email, password, salt, phone }: UserInput) {
    return users.create({
      email,
      password,
      salt,
      phone,
    });
  }

  async findAccount(email: string) {
    console.log("Inside Repository", email);
    return users.findOne({ email: email });
  }
}
