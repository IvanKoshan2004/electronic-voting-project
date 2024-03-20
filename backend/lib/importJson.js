import fs from "fs";
export function importJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
