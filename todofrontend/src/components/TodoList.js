import React, { Component } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import "./TodoList.css";
import axios from 'axios';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  // GET request for ALL todos
  componentWillMount(){
    axios
      .get(`/api/todos/`)
      .then( res => this.setState({ todos: res.data }))
  }

  addTodo(val) {
    axios
      .post("/api/todos/", { name: val})
      .then((newTodo) =>
        this.setState({ todos: [...this.state.todos, newTodo] })
      );
  }

  deleteTodo(id) {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        const todos = this.state.todos.filter((todo) => todo._id !== id);
        this.setState({ todos: todos });
      });
  }

  toggleTodo(todo) {
    // axios
    //   .put(`/api/todos/${todo._id}`, { completed: !todo.completed })
    //    .then((toggledTodo) => {
    //     const updatedTodos = this.state.todos.map((todo) =>
    //     todo._id === toggledTodo._id
    //       ? { ...todo, completed: !todo.completed }
    //       : todo
    //   );
    //   this.setState({ todos: updatedTodos });
    // });
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
      <div className="TodoList">
        <h1 >A Simple List<span>Fullstack React Express Mongo Todo App</span> </h1>
        <AddTodo addTodo={this.addTodo} />
        <ul style={{ listStyleType: "none" }}>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
