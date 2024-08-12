import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ServicesStack } from "./service-stack";
import { ApiGateWayStack } from "./api-gateway-stack";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class UserServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const {
      loginService,
      signUpService,
      userService,
      cartService,
      paymentService,
      verificationService,
    } = new ServicesStack(this, "UserService", {});
    new ApiGateWayStack(this, "UserApiGateWay", {
      loginService,
      signUpService,
      userService,
      cartService,
      paymentService,
      verificationService,
    });
  }
}
