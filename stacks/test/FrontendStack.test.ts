import { Template } from "aws-cdk-lib/assertions";
import { initProject } from "sst/project";
import { App, getStack } from "sst/constructs";
import { StorageStack } from "../StorageStack";
import { ApiStack } from "../ApiStack";
import { AuthStack } from "../AuthStack";
import { FrontendStack } from "../FrontendStack";
import { it } from "vitest";

it("FrontendStack has ", async () => {
  await initProject({});
  const app = new App({ mode: "deploy" });
  // WHEN
  app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
  // THEN
  const template = Template.fromStack(getStack(FrontendStack));
  console.log(template)
  template.hasOutput('SiteUrl', {})
});