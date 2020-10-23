import React, { Component } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentWillMount() {
    fetch("/api/todos")
      .then((data) => {
        if (!data.ok) {
          if (data.status >= 400 && data.status < 500) {
            return data.json().then((data) => {
              let err = { errorMessage: data.messsage };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Server not responding. Please try later.",
            };
            throw err;
          }
        }
        return data.json();
      })
      .then((todos) => this.setState({ todos }));
  }

  addTodo(val) {
    fetch("/api/todos/", {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ name: val }),
    })
      .then((data) => {
        if (!data.ok) {
          if (data.status >= 400 && data.status < 500) {
            return data.json().then((data) => {
              let err = { errorMessage: data.messsage };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Server not responding. Please try later.",
            };
            throw err;
          }
        }
        return data.json();
      })
      .then((newTodo) =>
        this.setState({ todos: [...this.state.todos, newTodo] })
      );
  }

  deleteTodo(id) {
    fetch(`/api/todos/${id}`, {
      method: "delete",
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            return res.json().then((res) => {
              let err = { errorMessage: res.messsage };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Server not responding. Please try later.",
            };
            throw err;
          }
        }
        return res.json();
      })
      .then(() => {
        const todos = this.state.todos.filter((todo) => todo._id !== id);
        this.setState({ todos: todos });
      });
  }

  toggleTodo(todo) {
    fetch(`/api/todos/${todo._id}`, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            return res.json().then((res) => {
              let err = { errorMessage: res.messsage };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Server not responding. Please try later.",
            };
            throw err;
          }
        }
        return res.json();
      })
      .then((toggledTodo) => {
        const updatedTodos = this.state.todos.map((todo) =>
          todo._id === toggledTodo._id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
        this.setState({ todos: updatedTodos });
      });
  }

  updateTodo(_id, updatedName) {
    fetch(`/api/todos/${_id}`, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ name: updatedName }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            return res.json().then((res) => {
              let err = { errorMessage: res.messsage };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Server not responding. Please try later.",
            };
            throw err;
          }
        }
        return res.json();
      })
      .then((updatedTodo) => {
        const updatedTodos = this.state.todos.map((todo) =>{
          if(todo._id === updatedTodo._id){
            return { ...todo, name: updatedName }
          }
            return todo;
        });
        this.setState({ todos: updatedTodos });
      });
  }

  render() {
    const todos = this.state.todos.map((todo) => (
      <TodoItem
        key={todo._id}
        {...todo}
        onDelete={this.deleteTodo.bind(this, todo._id)}
        onToggle={this.toggleTodo.bind(this, todo)}
        updateTodo={this.updateTodo}
        
      />
    ));
    return (
      <div>
        <h1>Todo List</h1>
        <AddTodo addTodo={this.addTodo} />
        <ul style={{ listStyleType: "none" }}>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
