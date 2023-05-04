import formidable from "formidable";
import fs from "fs";

let uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 1024 * 1024 * 2,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});
