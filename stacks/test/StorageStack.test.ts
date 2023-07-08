import { Template } from "aws-cdk-lib/assertions";
import { initProject } from "sst/project";
import { App, getStack } from "sst/constructs";
import { StorageStack } from "../StorageStack";
import { it } from "vitest";

it("StorageStack has S3 Bucket", async () => {
  await initProject({});
  const app = new App({ mode: "deploy" });
  // WHEN
  app.stack(StorageStack);
  // THEN
  const template = Template.fromStack(getStack(StorageStack));
  template.hasResource("AWS::S3::Bucket", {})
});

it("StorageStack has DynamoDB Table that has Pay_PER_REQUEST Billing Mode property", async () => {
  await initProject({});
  const app = new App({ mode: "deploy" });
  // WHEN
  app.stack(StorageStack);
  // THEN
  const template = Template.fromStack(getStack(StorageStack));
  template.hasResource("AWS::DynamoDB::Table", {})
  template.hasResourceProperties("AWS::DynamoDB::Table", {
    BillingMode: "PAY_PER_REQUEST",
  });
});