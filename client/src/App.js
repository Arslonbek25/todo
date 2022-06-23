import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3000";

function App() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = () => {
		fetch(`${API_BASE}/todos`)
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch(err => console.error("Error:", err));
	};

	const addTodo = async e => {
		e.preventDefault();
		if (!inputValue) return;
		const data = await fetch(`${API_BASE}/todo/new/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: inputValue }),
		}).then(res => res.json());

		setInputValue("");
		setTodos([data, ...todos]);
	};

	const completeTodo = async id => {
		const data = await fetch(`${API_BASE}/todo/complete/${id}`, { method: "PUT" }).then(res => res.json());

		if (data)
			setTodos(todos =>
				todos.map(todo => {
					if (todo._id === data._id) {
						todo.complete = data.complete;
					}
					return todo;
				})
			);
	};

	const removeTodo = async id => {
		const data = await fetch(`${API_BASE}/todo/delete/${id}`, { method: "DELETE" }).then(res => res.json());

		if (data) setTodos(todos => todos.filter(todo => todo._id !== data._id));
	};

	return (
		<div className="container">
			<form className="form-add" onSubmit={e => addTodo(e)}>
				<input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} required />
				<label htmlFor="name">
					<span>To do</span>
				</label>
			</form>
			<div className="todos">
				{todos.map(todo => (
					<div className="todo" key={todo._id}>
						<button
							className={"btn btn-checkbox" + (todo.complete ? " btn-checked" : "")}
							onClick={() => completeTodo(todo._id)}></button>
						{todo.text}
						<button className="btn btn-delete" onClick={() => removeTodo(todo._id)}></button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
