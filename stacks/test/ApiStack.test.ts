import { Template } from "aws-cdk-lib/assertions";
import { initProject } from "sst/project";
import { App, getStack } from "sst/constructs";
import { StorageStack } from "../StorageStack";
import { ApiStack } from "../ApiStack";
import { it } from "vitest";

it("ApiStack has IAM Role", async () => {
  await initProject({});
  const app = new App({ mode: "deploy" });
  // WHEN
  app.stack(StorageStack).stack(ApiStack);
  // THEN
  const template = Template.fromStack(getStack(ApiStack));
  template.hasResourceProperties("AWS::IAM::Role", {})
});