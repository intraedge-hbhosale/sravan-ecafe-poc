import { aws_apigateway } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGateWayStackProps {
  productService: IFunction;
  categoryService: IFunction;
  dealsService: IFunction;
  queueService: IFunction;
}

interface ResourceType {
  name: string;
  method: string[];
  child?: ResourceType;
}
export class ApiGateWayStack extends Construct {
  constructor(scope: Construct, id: string, props: ApiGateWayStackProps) {
    super(scope, id);
    this.addResources("products", props);
  }

  addResources(
    serviceName: string,
    {
      productService,
      categoryService,
      dealsService,
      queueService,
    }: ApiGateWayStackProps
  ) {
    const apigw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`, {
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
      },
    });
    this.createEndpoint(productService, apigw, {
      name: "product",
      method: ["GET", "POST"],
      child: {
        name: "{id}",
        method: ["GET", "PUT", "DELETE"],
      },
    });
    this.createEndpoint(categoryService, apigw, {
      name: "category",
      method: ["GET", "POST"],
      child: {
        name: "{id}",
        method: ["GET", "PUT", "DELETE"],
      },
    });
    this.createEndpoint(dealsService, apigw, {
      name: "deals",
      method: ["GET", "POST"],
      child: {
        name: "{id}",
        method: ["GET", "PUT", "DELETE"],
      },
    });
    this.createEndpoint(queueService, apigw, {
      name: "products-queue",
      method: ["POST"],
    });
  }

  createEndpoint(
    handler: IFunction,
    resource: RestApi,
    { name, method, child }: ResourceType
  ) {
    const lambdaFunction = new LambdaIntegration(handler);
    const rootResources = resource.root.addResource(name);
    method.map((item) => {
      rootResources.addMethod(item, lambdaFunction);
    });

    if (child) {
      const childResources = rootResources.addResource(child.name);
      child.method.map((item) => {
        childResources.addMethod(item, lambdaFunction);
      });
    }
  }
}
