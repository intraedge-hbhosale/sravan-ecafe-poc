import { IsEmail, Length } from "class-validator";
import { CipherParams } from "crypto-ts/src/lib/CipherParams";

export class LoginInput {
  @IsEmail()
  email: string;
  @Length(6, 32)
  password: string;
}
