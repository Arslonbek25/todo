import { useState, useEffect } from "react";

const API_BASE = process.env.REACT_APP_API_BASE;

function App() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = () => {
		fetch(`${API_BASE}todos`)
			.then(res => res.json())
			.then(data => setTodos(sortByDate(data)))
			.catch(err => console.error("Error:", err));
	};

	const addTodo = async e => {
		if (e.keyCode !== 13) return;

		if (!inputValue) return;
		const data = await fetch(`${API_BASE}todo/new/`, {
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
		const data = await fetch(`${API_BASE}todo/complete/${id}`, { method: "PUT" }).then(res => res.json());

		if (data)
			setTodos(
				todos.map(todo => {
					if (todo._id === data._id) todo.complete = data.complete;
					return todo;
				})
			);
	};

	const removeTodo = async id => {
		const data = await fetch(`${API_BASE}todo/delete/${id}`, { method: "DELETE" }).then(res => res.json());

		if (data) setTodos(todos => todos.filter(todo => todo._id !== data._id));
	};

	const sortByDate = todos => todos.sort((a, b) => b.timestamp - a.timestamp);
	const sortByCompletion = todos => todos.sort((a, b) => b.complete - a.complete);
	const sortByIncompletion = todos => todos.sort((a, b) => a.complete - b.complete);

	const sort = async e => {
		const sortBy = e.target.options[e.target.selectedIndex].value;
		let sortedTodos;

		switch (sortBy) {
			case "dateAdded":
				sortedTodos = sortByDate(todos);
				break;
			case "completed":
				sortedTodos = sortByCompletion(todos);
				break;
			case "uncompleted":
				sortedTodos = sortByIncompletion(todos);
				break;
			default:
				sortedTodos = todos;
				break;
		}

		setTodos([...sortedTodos]);
	};

	return (
		<div className="container">
			<div className="form-add">
				<input
					type="text"
					onChange={e => setInputValue(e.target.value)}
					onKeyUp={e => addTodo(e)}
					value={inputValue}
					required
				/>
				<label htmlFor="name">
					<span>To do</span>
				</label>
			</div>
			<div className="options">
				<select className="sort-by" onChange={e => sort(e)}>
					<option value="dateAdded">Date added</option>
					<option value="completed">Completed tasks</option>
					<option value="uncompleted">Uncompleted tasks</option>
					{/* <option value="importance">Importance</option> */}
				</select>
			</div>
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
