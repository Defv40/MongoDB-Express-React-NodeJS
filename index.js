import express from "express";

import mongoose from "mongoose";
import * as Auth from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import { postCreateValidation } from "./validations/post.js";

const username = "admin";
const password = "pSOI234-zxcl";

const uriMongoDb = `mongodb+srv://${username}:${password}@cluster0.owdqzt6.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose
  .connect(uriMongoDb)
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => console.log(err.message));

const app = express();

app.use(express.json()); // учим читать json

app.get("/", (req, res) => {
  res.send("index");
});

app.post("/auth/login", Auth.loginValidation, UserController.login);
app.post("/auth/register", Auth.registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

 app.get('/posts', PostController.getAll);
 app.get('/posts/:id', PostController.get);
 app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);


app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("ok");
});
