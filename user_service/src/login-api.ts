import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { UserService } from "./service/user-service";
import { UserRepository } from "./repository/user-repository";
import { ErrorResponse } from "./utility/response";
import "./utility";

const service = new UserService(new UserRepository());
export const handler = middy(
  (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod.toLocaleLowerCase() === "post") {
      return service.UserLogin(event);
    }
    return service.ResponseWithError(event);
  }
).use(jsonBodyParser());
