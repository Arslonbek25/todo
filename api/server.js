const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todos = require("./routes/todos");
const todo = require("./routes/todo");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todos", todos);
app.use("/todo", todo);

mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(console.log("Connected to DB"))
	.catch(console.error);

app.listen(3000);
