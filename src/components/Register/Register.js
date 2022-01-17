import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userRegister } from '../../actions/actionCreators';
import "./Register.scss";

const Register = ({ isRegistr, userRegister }) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        setName("");
        setPassword("");
    };
    console.log(isRegistr)
    return (
        <div className='Register'>
            <h1 className="Register__title">Register</h1>
            <Form className='Register__form' onSubmit={handelSubmit}>
                <div className='Register__input-block'>
                    <label>Username</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='Register__input-block'>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </Form>
            {!isRegistr ? <p className='error'>Пользователь с таким именем уже существует</p> : null}
            <div className='Register__btn-block'>
                <Link 
                    className='green' 
                    to={!isRegistr ? '/register' : '/todo'}
                    onClick={() => userRegister(name, password)}
                >Register</Link>
                <Link to='/'>Cancel</Link>
            </div>
        </div>
    );
}

const mapStateToProps = ({todolistReducer}) => {
    return { isRegistr: todolistReducer.isRegistr}
}
  
const mapDispatchToProps = dispatch => {
    return {
        userRegister: (name, password) => dispatch(userRegister(name, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
