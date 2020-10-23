import React, { Component } from "react";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit() {
    this.props.addTodo(this.state.inputValue);
    //clears form input
    this.setState({ inputValue: "" });
  }

  render() {
    return (
      <div>
      <form>
      <label htmlFor="todo">New Todo</label>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Enter a task..."
        />
        <button onClick={this.handleSubmit}>Add Todo</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
