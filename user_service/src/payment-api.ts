import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { PaymentService } from "./service/payment-service";
import { PaymentRepository } from "./repository/payment-respository";
import { ErrorResponse } from "./utility/response";

const service = new PaymentService(new PaymentRepository());
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod.toLowerCase()) {
    case "post":
      return service.CreatePaymentMethod();
    case "get":
      return service.GetPaymentMethod();
    case "put":
      return service.UpdatePaymentMethod();
  }
  return ErrorResponse(404, "requested method not allowed");
};
