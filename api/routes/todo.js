const router = require("express").Router();
const Todo = require("../model/Todo");

router.post("/new", (req, res) => {
	const todo = new Todo({ text: req.body.text });
	todo.save();
	res.json(todo);
});

router.put("/complete/:id", async (req, res) => {
	let todo;
	try {
		todo = await Todo.findById(req.params.id);
		todo.complete = !todo.complete;
		todo.save();
	} catch {}
	res.json(todo);
});

router.delete("/delete/:id", async (req, res) => {
	let result = await Todo.findByIdAndDelete(req.params.id);

	res.json(result);
});

module.exports = router;
