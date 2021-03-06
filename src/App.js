import React from "react";
import "./App.scss";
import { Container } from "react-bootstrap";
import ToDoBlock from "./components/ToDoBlock/ToDoBlock";

function App() {
  return (
    <div className='App'>
      <Container>
        <h1 className='App__title'>todos</h1>
        <ToDoBlock />
      </Container>
    </div>
  );
}

export default App;
