import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: ["hi", "hello"], value: "" };
    }

    addItem(e) {
        e.preventDefault();
        if (!this.state.value || this.state.todos.includes(this.state.value))
            return;
        this.setState({
            todos: [...this.state.todos, this.state.value],
            value: "",
        });
        document.querySelector("form").reset();
    }

    handleChange(e) {
        if (e.target.value.length) this.setState({ value: e.target.value });
    }

    removeItem(index) {
        this.setState({
            todos: [...this.state.todos].filter((todo, i) => index !== i),
        });
    }

    render() {
        let list = this.state.todos.map((item, index) => (
            <li key={index}>
                {item}
                <button onClick={() => this.removeItem(index)}>
                    Remove {index}
                </button>
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
