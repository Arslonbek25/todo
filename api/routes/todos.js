const router = require("express").Router();
const Todo = require("../model/Todo");

router.get("/", async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

module.exports = router;
