import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { CartService } from "./service/cart-service";
import { CartRepository } from "./repository/cart-repository";
import { ErrorResponse } from "./utility/response";

const service = new CartService(new CartRepository());
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod.toLowerCase()) {
    case "post":
      return service.CreateCart();
    case "get":
      return service.GetCart();
    case "put":
      return service.UpdateCart();
  }
  return ErrorResponse(404, "requested method not allowed");
};
