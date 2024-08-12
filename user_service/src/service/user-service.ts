import { APIGatewayEvent } from "aws-lambda";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { UserRepository } from "../repository/user-repository";
import { AppValidationError } from "../utility/errors";
import {
  GetHashedPassword,
  ValidatePassword,
  GetToken,
  VerifyToken,
} from "../utility/password";
import { plainToClass } from "class-transformer";
import { SignUpInput } from "../dto/signup-input";
import { LoginInput } from "../dto/login-input";

export class UserService {
  _repository: UserRepository;
  constructor(repository: UserRepository) {
    this._repository = repository;
  }

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorResponse(404, new Error("method not allowed"));
  }

  async CreateUser(event: APIGatewayEvent) {
    try {
      const input = plainToClass(SignUpInput, event.body);
      const error = await AppValidationError(input);
      if (error) {
        return ErrorResponse(404, error);
      }
      const salt = "bsbfnsfytyetyretnjknksj";
      const parsedInput = JSON.parse(event.body!);
      //const hashedPassword = GetHashedPassword(input.password, salt);;
      const data = await this._repository.createAccount({
        email: parsedInput.email,
        password: parsedInput.password,
        phone: parsedInput.phone,
        salt,
      });
      return SuccessResponse(data!);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UserLogin(event: APIGatewayEvent) {
    try {
      const input = plainToClass(LoginInput, event.body);
      const error = await AppValidationError(input);
      if (error) {
        return ErrorResponse(404, error);
      }

      const data = await this._repository.findAccount(input.email);
      console.log("********************************", data);
      // const verified = await ValidatePassword(
      //   parsedInput.password,
      //   data.password,
      //   data.salt
      // );
      const verified = input.password === data.password ? true : false;
      if (!verified) {
        throw new Error("password does not match");
      }
      const token = GetToken(data);
      //check or validate password
      return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetVerificationToken(event: APIGatewayEvent) {
    return SuccessResponse({ message: "Here is the verification token" });
  }

  async VerifyUser(event: APIGatewayEvent) {
    return SuccessResponse({ message: "User Account Verified Succesfully" });
  }

  async CreateProfile(event: APIGatewayEvent) {
    return SuccessResponse({ message: "Response From Create Profile" });
  }

  async GetProfile(event: APIGatewayEvent) {
    return SuccessResponse({ message: "Response From Get Profile" });
  }

  async EditProfile(event: APIGatewayEvent) {
    return SuccessResponse({ message: "Response From Edit Profile" });
  }
}
