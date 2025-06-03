import express from "express";
import path from "path";
import url from "url";
import { configDotenv } from "dotenv";

configDotenv();
const dbLink = process.env.uri;
const __filepath = url.fileURLToPath(import.meta.url);

const __dirpath = path.dirname(__filepath);

const app = express();

app.use(express.static("./public"));

app.listen(8000, () => {
  console.log("listening for incoming requests. ");
});

export { express, path, url, app, __dirpath  , dbLink};
