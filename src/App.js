import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.scss";

import ToDoBlock from "./components/ToDoBlock/ToDoBlock";
import Auth from "./components/Auth/Auth";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Main from "./components/Main/Main";

function App() {

  const [auth, setAuth] = useState()

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

        {/* <Routes>
          <Route path="app" element={<Main/>}>
            <PrivateRoute isAuth={localStorage.getItem('token')} path="/todo" component={ToDoBlock} redirectTo='/login'/>
          </Route>
        </Routes> */}

      </Container>
    </div>
  );
}

export default App;
