import { aws_apigateway } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface ApiGateWayStackProps {
  loginService: IFunction;
  signUpService: IFunction;
  userService: IFunction;
  cartService: IFunction;
  paymentService: IFunction;
  verificationService: IFunction;
}

interface ResourceType {
  name: string;
  method: string[];
  child?: ResourceType;
}
export class ApiGateWayStack extends Construct {
  constructor(scope: Construct, id: string, props: ApiGateWayStackProps) {
    super(scope, id);
    this.addResources("users", props);
  }

  addResources(
    serviceName: string,
    {
      loginService,
      signUpService,
      userService,
      cartService,
      paymentService,
      verificationService,
    }: ApiGateWayStackProps
  ) {
    const apigw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`, {
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
      },
    });
    this.createEndpoint(loginService, apigw, {
      name: "login",
      method: ["POST"],
    });
    this.createEndpoint(signUpService, apigw, {
      name: "signup",
      method: ["POST"],
    });
    this.createEndpoint(userService, apigw, {
      name: "user",
      method: ["GET", "POST", "PUT", "DELETE"],
    });
    this.createEndpoint(cartService, apigw, {
      name: "cart",
      method: ["GET", "POST", "PUT"],
    });
    this.createEndpoint(paymentService, apigw, {
      name: "payment",
      method: ["GET", "POST", "PUT"],
    });
    this.createEndpoint(verificationService, apigw, {
      name: "verification",
      method: ["GET", "POST"],
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
