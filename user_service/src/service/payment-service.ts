import { APIGatewayProxyEventV2 } from "aws-lambda";
import { PaymentRepository } from "../repository/payment-respository";
import { SuccessResponse } from "../utility/response";

export class PaymentService {
  _repository: PaymentRepository;
  constructor(repository: PaymentRepository) {
    this._repository = repository;
  }

  async CreatePaymentMethod() {
    return SuccessResponse({ message: "Response From Create Payment Method" });
  }

  async GetPaymentMethod() {
    return SuccessResponse({ message: "Response From Get Payment Method" });
  }

  async UpdatePaymentMethod() {
    return SuccessResponse({ message: "Response From Update Payment Method" });
  }
}
