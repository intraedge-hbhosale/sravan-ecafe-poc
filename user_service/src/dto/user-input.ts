import { CipherParams } from "crypto-ts/src/lib/CipherParams";

export interface UserInput {
  user_id?: string;
  email: string;
  password: string;
  phone: string;
  salt: string;
}
