import { put } from "@vercel/blob";
import fs from "node:fs/promises";

async function putFile(fileName, filePath, contentType) {
  const file = await fs.readFile(filePath, {
    encoding: "utf8",
  });

  const { url } = await put(fileName, file, {
    access: "public",
    contentType,
    contentDisposition: "inline",
  });
  return url;
}

let url = await putFile("tokens.css", "./build/css/variables.css", "text/css");
console.log(url);

url = await putFile(
  "tokens.json",
  "./build/json/variables.json",
  "application/json"
);
console.log(url);
