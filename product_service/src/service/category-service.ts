import { APIGatewayEvent } from "aws-lambda";
import { CategoryRepository } from "../repository/category-repository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { plainToClass } from "class-transformer";
import { AppValidationError } from "../utility/errors";
import { CategoryInput } from "../dto/category-input";

export class CategoryService {
  _repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this._repository = repository;
  }

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorResponse(404, new Error("method not allowed"));
  }

  async createCategory(event: APIGatewayEvent) {
    const input = plainToClass(CategoryInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(404, error);

    const data = await this._repository.createCategory(input);
    return SuccessResponse(data);
  }

  async getCategories(event: APIGatewayEvent) {
    const data = await this._repository.getAllCategories();
    return SuccessResponse(data!);
  }

  async getCategory(event: APIGatewayEvent) {
    const Categoryid = event.pathParameters?.id;
    if (!Categoryid) {
      return ErrorResponse(403, "Please provide Category id");
    }
    const data = await this._repository.getCategoryById(Categoryid!);
    return SuccessResponse(data!);
  }

  async editCategory(event: APIGatewayEvent) {
    const Categoryid = event.pathParameters?.id;
    if (!Categoryid) {
      return ErrorResponse(403, "Please provide Category id");
    }
    const input = plainToClass(CategoryInput, event.body);
    const error = await AppValidationError(Categoryid);
    if (error) {
      return ErrorResponse(404, error);
    }

    input.id = Categoryid;
    const data = await this._repository.editCategory(input);
    return SuccessResponse(data!);
  }

  async deleteCategory(event: APIGatewayEvent) {
    const Categoryid = event.pathParameters?.id;
    if (!Categoryid) {
      return ErrorResponse(403, "Please provide Category id");
    }
    const data = await this._repository.deleteCategory(Categoryid);
    return SuccessResponse(data!);
  }
}
