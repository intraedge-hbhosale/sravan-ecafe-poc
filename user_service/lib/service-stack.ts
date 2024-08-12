import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface ServiceProps {
  bucket?: any;
}

export class ServicesStack extends Construct {
  public readonly loginService: NodejsFunction;
  public readonly signUpService: NodejsFunction;
  public readonly userService: NodejsFunction;
  public readonly cartService: NodejsFunction;
  public readonly paymentService: NodejsFunction;
  public readonly verificationService: NodejsFunction;

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        BUCKET_NAME: "OUR_BUCKET_ARN",
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(10),
    };

    this.loginService = new NodejsFunction(this, "loginLambda", {
      entry: join(__dirname, "/../src/login-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.signUpService = new NodejsFunction(this, "signUpLambda", {
      entry: join(__dirname, "/../src/signup-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.userService = new NodejsFunction(this, "userLambda", {
      entry: join(__dirname, "/../src/user-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.cartService = new NodejsFunction(this, "cartLambda", {
      entry: join(__dirname, "/../src/cart-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.paymentService = new NodejsFunction(this, "paymentLambda", {
      entry: join(__dirname, "/../src/payment-api.ts"),
      ...nodeJsFunctionProps,
    });

    this.verificationService = new NodejsFunction(this, "verificationLambda", {
      entry: join(__dirname, "/../src/verification-api.ts"),
      ...nodeJsFunctionProps,
    });
  }
}
