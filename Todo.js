import "./Todo.css";
import TodoList from "./TodoList";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ task, i, handleComplete, handleRemove }) {
  return (
    <div>
      <div
        className="task"
        style={{ textDecoration: task.completed ? "line-through" : "" }}
      >
        {" "}
        {task.title}{" "}
        <Button variant="danger" size="sm" onClick={() => handleRemove(i)}>
          {" "}
          <FontAwesomeIcon icon={faTrash} />{" "}
        </Button>{" "}
        <Button variant="success" size="sm" onClick={() => handleComplete(i)}>
          {" "}
          ✔{" "}
        </Button>{" "}
      </div>{" "}
    </div>
  );
}

function CreateNewNote({ addNotes }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addNotes(value);
    setValue("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="title"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Todo List"
        />
      </Form.Group>{" "}
      <Button type="submit">
        {" "}
        <FontAwesomeIcon icon={faPlusCircle} />
        Add Remainder{" "}
      </Button>{" "}
    </Form>
  );
}

function Todo() {
  var [date, setDate] = useState(new Date());

  const [searchQuery, setSearchQuery] = useState("");
  const [remainingNotes, setRemainingNotes] = useState(0);
  const [notes, setNotes] = useState([
    {
      title: "Meeting at 4:30PM",

      completed: false,
    },
    {
      title: "Workout",
      completed: false,
    },
    {
      title: "Doctor Appointment",
      completed: false,
    },
  ]);

  useEffect(() => {
    setRemainingNotes(notes.filter((task) => !task.completed).length);
  });

  useEffect(() => {
    var Timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(Timer);
    };
  });
  const addNotes = (title) => {
    const newNotes = [...notes, { title, completed: false }];
    setNotes(newNotes);
  };

  const handleComplete = (i) => {
    let newNotes = [...notes];
    newNotes[i].completed = true;
    setNotes(newNotes);
  };

  const handleRemove = (i) => {
    let newNotes = [...notes];
    newNotes.splice(i, 1);
    setNotes(newNotes);
  };

  return (
    <div className="todo-container">
      <div className="data-time">
        <b> Time: {date.toLocaleTimeString()} </b>{" "}
        <b> Date: {date.toLocaleDateString()} </b>{" "}
      </div>{" "}
      <TodoList notes={notes} />{" "}
      <div className="tasks">
        {" "}
        {notes.map((task, i) => (
          <Task
            task={task}
            i={i}
            handleComplete={handleComplete}
            handleRemove={handleRemove}
            key={i}
          />
        ))}{" "}
      </div>{" "}
      <div className="create-Note">
        <CreateNewNote addNotes={addNotes} />{" "}
      </div>{" "}
      <div> </div>{" "}
    </div>
  );
}

export default Todo;
