import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

import ToDoBlock from "./components/ToDoBlock/ToDoBlock";
import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";

const App: React.FC = () => {

  const [auth, setAuth] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(token)
    }
  }, []);

  return (
    <div className='App'>
      <Container>
        <Routes>
          <Route 
            path="/" 
            element={ auth ? <Navigate to="/todo" replace/> : <Auth/>}/>
          <Route 
            path="/register" 
            element={ auth ? <Navigate to="/todo" replace/> : <Register/>}/>
          <Route 
            path="/todo" 
            element={ auth ? <ToDoBlock/> : <Navigate to="/" replace/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
