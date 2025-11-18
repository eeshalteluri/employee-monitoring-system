function getValue(obj: any, path: string) {
  console.log("get() called with:");
  console.log("  obj =", obj);
  console.log("  path =", path);

  const parts = path.split(".");
  console.log("  split path =", parts);

  let current = obj;

  for (const p of parts) {
    console.log(`  accessing current["${p}"] ->`, current?.[p]);
    current = current?.[p];
  }

  console.log("  final resolved value =", current);
  return current;
}

export default getValue;