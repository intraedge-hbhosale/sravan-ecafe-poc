import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { UserService } from "./service/user-service";
import { UserRepository } from "./repository/user-repository";
import { ErrorResponse } from "./utility/response";

const service = new UserService(new UserRepository());
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod.toLowerCase()) {
    case "post":
      return service.VerifyUser(event);
    case "get":
      return service.GetVerificationToken(event);
    default:
      return ErrorResponse(404, "requested method not allowed");
  }
};
