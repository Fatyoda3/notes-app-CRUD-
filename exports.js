import express from "express";
import path from "path";
import url from "url";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
// import cors from "cors";
configDotenv();

// const dbLink = process.env.uri;

const __filepath = url.fileURLToPath(import.meta.url);
const __dirpath = path.dirname(__filepath);

const app = express();
// app.use(cors());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8000, () => {
  console.log("listening for incoming requests. ");
});

export { express, path, url, app, __dirpath, mongoose };
