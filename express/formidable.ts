import formidable from "formidable";
import fs from "fs";
import crypto from "crypto";

let uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export function newForm() {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 1024 * 1024 * 20,
    filename: (name, ext, part, form) => {
      return crypto.randomUUID() + "." + part.mimetype?.split("/").pop();
    },
    filter: (part) => part.mimetype?.startsWith("image/") || false,
  });
  return form;
}
