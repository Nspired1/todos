import React from "react";

function TodoItem({ name, completed, created_date, onDelete, onToggle }) {
  const due_date = created_date.slice(0, 10).split(":");
  return (
    <div>
      <li>
        <span
          onClick={onToggle}
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {name} {due_date}{" "}
        </span>{" "}
        <span onClick={onDelete}> X </span>
      </li>
    </div>
  );
}

export default TodoItem;
