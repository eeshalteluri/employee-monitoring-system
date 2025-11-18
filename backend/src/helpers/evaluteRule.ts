import compareValues from "./compareValues";
import getValue from "./getValue";

function evaluateRule(rule: any, ctx: any): boolean {
  if (rule.all) {
    return rule.all.every((r: any) => evaluateRule(r, ctx));
  }

  if (rule.any) {
    return rule.any.some((r: any) => evaluateRule(r, ctx));
  }

  if (rule.not) {
    return !evaluateRule(rule.not, ctx);
  }

  // --- Extract key safely ---
  const keys = Object.keys(rule);
  if (keys.length === 0) throw new Error("Invalid rule: empty object");

  const key = keys[0] as string;
  const condition = rule[key];

  if (typeof condition !== "object" || condition === null) {
    throw new Error(`Invalid condition for key '${key}'`);
  }

  // --- Extract operator safely ---
  const opKeys = Object.keys(condition);
  if (opKeys.length === 0) throw new Error(`No operator for key '${key}'`);

  const operator = opKeys[0] as string;

  const rightValue = condition[operator];

  const leftValue = getValue(ctx, key);

  const resolvedRight =
    typeof rightValue === "string" && rightValue.startsWith("resource.")
      ? getValue(ctx, rightValue)
      : rightValue;

  return compareValues(operator, leftValue, resolvedRight);
}

export default evaluateRule;
