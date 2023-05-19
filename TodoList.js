import React, { useState } from "react";

const TodoList = ({ notes }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = notes.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />{" "}
      <div>
        {" "}
        {filteredTodos.map((todo) => (
          <li key={todo.id}> {todo.title} </li>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default TodoList;
