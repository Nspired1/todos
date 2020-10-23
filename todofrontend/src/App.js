import React from "react";
import TodoList from "./components/TodoList";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash, faPen, faPenAlt} from '@fortawesome/free-solid-svg-icons';
library.add(faTrash, faPen, faPenAlt)

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
