import { Template } from "aws-cdk-lib/assertions";
import { initProject } from "sst/project";
import { App, getStack } from "sst/constructs";
import { StorageStack } from "../StorageStack";
import { ApiStack } from "../ApiStack";
import { AuthStack } from "../AuthStack";
import { it } from "vitest";

it("AuthStack has Cognito", async () => {
  await initProject({});
  const app = new App({ mode: "deploy" });
  // WHEN
  app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
  // THEN
  const template = Template.fromStack(getStack(AuthStack));
  console.log(template)
  template.hasResourceProperties("AWS::Cognito::UserPool", {})
});