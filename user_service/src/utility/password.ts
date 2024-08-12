import { SignUpInput } from "../dto/signup-input";
import * as jwt from "jsonwebtoken";
import { AES } from "crypto-ts";
import { CipherParams } from "crypto-ts/src/lib/CipherParams";

const APP_SECRET = "our_app_secret";

// export const GetSalt = async () => {
//   return await bcrypt.genSalt();
// };

export const GetHashedPassword = (password: string, secretkey: string) => {
  const ciphertext = AES.encrypt(password, secretkey);
  return ciphertext;
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: CipherParams,
  salt: string
) => {
  const hashedpassword = GetHashedPassword(enteredPassword, salt);
  return hashedpassword === savedPassword ? true : false;
};

export const GetToken = ({ email, user_id, phone }: SignUpInput) => {
  return jwt.sign({ email, user_id, phone }, APP_SECRET, {
    expiresIn: "30d",
  });
};

export const VerifyToken = async (
  token: string
): Promise<SignUpInput | false> => {
  try {
    if (token !== "") {
      const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
      return payload as SignUpInput;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
