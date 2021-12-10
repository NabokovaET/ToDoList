import React from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import ToDoBlock from './components/ToDoBlock/ToDoBlock';

function App() {
  return (
    <div className="App">
      <Container>
        <ToDoBlock/>
      </Container>
    </div>
  );
}

export default App;
