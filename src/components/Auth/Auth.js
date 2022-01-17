import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userLogin } from '../../actions/actionCreators';
import "./Auth.scss";

const Auth = ({isAuth, userLogin}) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        setName("");
        setPassword("");
    };

    return (
        <div className='Auth'>
            <h1 className="Auth__title">Login</h1>
            <Form className='Auth__form' onSubmit={handelSubmit}>
                <div className='Auth__input-block'>
                    <label>Username</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='Auth__input-block'>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </Form>
            { 
                !isAuth
                    ? <p className='error'>Неверный логин или пароль</p> 
                    : null
            }
            <div className='Auth__btn-block'>
                <Link 
                    className='green' 
                    to='/'
                    onClick={()=>userLogin(name, password)}
                >Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    );
}

const mapStateToProps = ({todolistReducer}) => {
    return { isAuth: todolistReducer.isAuth}
}
  
const mapDispatchToProps = dispatch => {
    return {
        userLogin: (name, password) => dispatch(userLogin(name, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
