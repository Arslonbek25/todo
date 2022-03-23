import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        const todo = localStorage.getItem("todo")
            ? JSON.parse(localStorage.getItem("todo"))
            : [];
        this.state = {
            todo: todo,
            value: "",
        };
    }

    addItem(e) {
        e.preventDefault();

        const value = this.state.value;
        const todo = this.state.todo;

        if (!value || todo.includes(value)) return;

        this.setState({
            todo: [...todo, value],
            value: "",
        });
        localStorage.setItem("todo", JSON.stringify(todo.concat(value)));
        document.querySelector("form").reset();
    }

    handleChange(e) {
        if (e.target.value.length) this.setState({ value: e.target.value });
    }

    removeItem(index) {
        const todo = [...this.state.todo].filter((todo, i) => index !== i);
        this.setState({ todo: todo });
        localStorage.setItem("todo", JSON.stringify(todo));
    }

    render() {
        let list = this.state.todo.map((item, index) => (
            <li key={index}>
                {item}
                <div className="btns">
                    <button onClick={() => this.removeItem(index)}>❌</button>
                    <button>✔️</button>
                </div>
            </li>
        ));

        return (
            <>
                <form onSubmit={(e) => this.addItem(e)}>
                    <input
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Enter an item"
                    />
                    <button>Add</button>
                </form>
                <ul>{list}</ul>
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
