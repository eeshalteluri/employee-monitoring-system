import { Action, POLICIES } from "@/constants/Allpolicies";
import evaluateRule from "./evaluteRule";


function hasAccess(user: any, action: Action, resource: any = {}) {
  const rule = POLICIES[action];
  if (!rule) return false;

  const context = { user, resource };
  return evaluateRule(rule, context);
}