import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userRegister } from '../../actions/actionCreators';
import "./Register.scss";
import eye from '../../img/eye.png';

const Register = ({ isRegistr, userRegister }) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(false);
    const [view, setView] = useState(false);

    useEffect(() => {
        console.log(name)
        if (Object.keys(errors).length === 0 && name && password) {
            setValid(true)
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors(formValid());

        if (valid) {
            setName("");
            setPassword("");
            userRegister(name, password);
        }
    };

    const formValid = () => {

        let errors = {};

        if (!name) {
            errors.email = 'Email address is required';
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(name)) {
            errors.email = 'Email address is invalid';
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
            .test(password)) {
            errors.password = 'Password is invalid';
        }

        return errors;
    }

    return (
        <div className='Register'>
            <h1 className="Register__title">Register</h1>
            <Form className='Register__form' onSubmit={handleSubmit}>
                <div className='Register__input-block'>
                    <label>Username</label>
                    <input
                        type='email'
                        value={name}
                        // placeholder="username@maill.com"
                        onBlur={() => setErrors(formValid())}
                        onChange={(e) => {setName(e.target.value)}}
                        className={!isRegistr ? 'Register__input_email error' : 'Register__input_email'}
                        required
                    />
                    {errors.email
                        ? <p className="error">{errors.email}</p>
                        : <p>Format username@email.com</p>
                    }
                </div>
                <div className='Register__input-block'>
                    <label>Password</label>
                    <div style={{position: 'relative'}}>
                        <input
                            type={view ? 'text' : 'password'}
                            value={password}
                            onBlur={() => setErrors(formValid())}
                            onChange={(e) => setPassword(e.target.value)}
                            className={!isRegistr ? 'Register__input_password error' : 'Register__input_password'}
                            required
                        />
                        <label
                            className='view'
                            onClick={() => {password && setView(!view)}}
                        ><img src={eye} alt="view"/></label>
                    </div>
     
                    {errors.password 
                        ? <p className="error">{errors.password}</p>
                        : <p>Include (a-z), (A-Z), (0-9), min 8 symbols</p>
                    }
                </div>
                {/* <div className='Register__input-block'>
                    <label>Password2</label>
                    <input
                        type='password2'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={ !isRegistr? 'error' : null}
                        required
                    />
                </div> */}
                {!isRegistr ? <p className='error'>Пользователь с таким именем уже существует</p> : null}
                <div className='Register__btn-block'>
                    <button 
                        type='submit'
                        className='green' 
                    >Register</button>
                    <Link to='/'>Cancel</Link>
                </div>
            </Form>
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
