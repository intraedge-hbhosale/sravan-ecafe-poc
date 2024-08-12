import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { UserService } from "./service/user-service";
import { UserRepository } from "./repository/user-repository";
import { ErrorResponse } from "./utility/response";
import "./utility";

const service = new UserService(new UserRepository());
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod.toLocaleLowerCase() === "post") {
    return service.CreateUser(event);
  }
  return ErrorResponse(404, "requested method not allowed");
};
