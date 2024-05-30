import React, { useState } from "react";
import Dashboard from "./dashboard";
import Edit from "./edit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: `todo task`,text: 'Build a Todo App', completed: false },
    { id: 2, name: `todo task`,text: 'Build a Todo App', completed: true },
    { id: 3, name: `todo task`,text: 'Build a Todo App', completed: false },
  ]);
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard data={todos} setData={setTodos}/>}></Route>
            <Route path="/edit-user/:id" element={<Edit data={todos} setData={setTodos}/>}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
