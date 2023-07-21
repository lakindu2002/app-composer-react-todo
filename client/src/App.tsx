import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

type Todo = {
  id?: string;
  title: string;
  description: string;
};

const initialValue: Todo = { title: "", description: "" };

function App() {
  const [todo, setTodo] = useState<Todo>(initialValue);
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = async () => {
    const resp = await axios.post<Todo>(`/api/todo`, todo);
    setTodo(initialValue);
    setTodos((prev) => [...prev, resp.data]);
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`/api/todo/${id}`);
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const getAllTodos = async () => {
    const resp = await axios.get<{ items: Todo[] }>(`/api/todos`);
    setTodos(resp.data.items);
  };

  const updateById = async () => {
    await axios.patch<Partial<Todo>>(`/api/todo/${todo.id}`, todo);
    setTodos((prev) => prev.map((item) => (item.id === todo.id ? todo : item)));
    setTodo(initialValue);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-container">
          <input
            className="input"
            placeholder="Title"
            onChange={(e) =>
              setTodo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <br />
          <input
            className="input"
            placeholder="Description"
            onChange={(e) =>
              setTodo((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <br />
          <button onClick={() => (todo.id ? updateById() : addTodo())}>
            {todo.id ? "Update" : "Create"}
          </button>
        </div>
        {todos.map((eachTodo) => (
          <>
            <p>
              Title: {eachTodo.title}
              <br />
              Description: {eachTodo.description}
              <br />
              <button onClick={() => deleteTodo(eachTodo.id as string)}>
                Delete
              </button>
              <button onClick={() => setTodo(eachTodo)}>Update</button>
            </p>
          </>
        ))}
      </header>
    </div>
  );
}

export default App;
