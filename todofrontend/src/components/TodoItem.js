import React, { Component } from "react";


// function TodoItem({ name, completed, created_date, onDelete, onToggle, onEdit }) {
//   const due_date = created_date.slice(0, 10).split(":");
//   return (
//     <div>
//       <li>
//         <span
//           onClick={onToggle}
//           style={{ textDecoration: completed ? "line-through" : "none" }}
//         >
//           {name} {due_date}{" "}
//         </span>{" "}
//         <EditTodo name={name} handleEdit={onEdit}/>
//         <span onClick={onDelete}> X </span>
//       </li>
//     </div>
//   );
// }

class TodoItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : this.props.name,
      //completed : this.props.completed,
      //created_date : this.props.created_date,
      //onDelete : this.props.onDelete,
      //onToggle : this.props.onToggle,
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
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
            <button>Save</button>
          </form>
        </div>
      ) 
    } else {
      result = (
        <div>
        <li>
        <span
            onClick={this.props.onToggle}
            style={{ textDecoration: this.props.completed ? "line-through" : "none" }}
          >
            {this.props.name} {" "} {due_date}
          </span>{" "}
         <button onClick={this.toggleForm}>Edit</button>
          <span onClick={this.props.onDelete}> X </span>
        </li>
  
        </div>
      )
    }
    return (
      result
    )
  }

  }






export default TodoItem;
