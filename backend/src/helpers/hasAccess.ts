import fs from "fs";
import path from "path";

import evaluateRule from "./evaluteRule";

console.log("Directory Name: ", __dirname);
const policyPath = path.join(__dirname, "../policies/AllPolicies.json");
const policies = JSON.parse(fs.readFileSync(policyPath, "utf8"));

function hasAccess(user: any, action: string, resource: any = {}) {
  const rule = policies[action];
  if (!rule) return false;

  const context = { user, resource };
  return evaluateRule(rule, context);
}

export default hasAccess;