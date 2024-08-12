import { APIGatewayProxyEventV2 } from "aws-lambda";
import { CartRepository } from "../repository/cart-repository";
import { SuccessResponse } from "../utility/response";

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async CreateCart() {
    return SuccessResponse({ message: "Response From Create Cart" });
  }

  async GetCart() {
    return SuccessResponse({ message: "Response From Get Cart" });
  }

  async UpdateCart() {
    return SuccessResponse({ message: "Response From Update Cart" });
  }
}
