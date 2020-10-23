import React, { Component } from "react";
import './Todo.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class TodoItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : this.props.name,
      isEditing: false
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.updateTodo(this.props._id, this.state.name);
    this.setState({isEditing: false});
  }

  toggleForm(){
    this.setState({ isEditing: !this.state.isEditing})
  }
 
  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  render(){
    let due_date = this.props.created_date.slice(0, 10).split(":");
    let result;
    if(this.state.isEditing){
      result = (
        <div className="Todo">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
            <button>Save</button>
          </form>
        </div>
      ) 
    } else {
      result = (
        <div className="Todo">
          <li>
            <span
                onClick={this.props.onToggle}
                style={{ textDecoration: this.props.completed ? "line-through" : "none" }}
              >
                {this.props.name} {" "} {due_date}
              </span>{" "}
              <span onClick={this.toggleForm}>
                <FontAwesomeIcon icon="pen-alt" className="icon pen-alt" />
              </span>
              <span onClick={this.props.onDelete}><FontAwesomeIcon icon="trash" className="icon trash" /></span>
          </li>
        </div>
      )
    }
    return result
  }

  }

export default TodoItem;
