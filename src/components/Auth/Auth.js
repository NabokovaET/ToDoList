import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userLogin, googleAccount } from '../../actions/actionCreators';
import "./Auth.scss";

const Auth = ({isAuth, userLogin}) => {

    const { register, formState: { errors }, handleSubmit } = useForm({mode: "onBlur"})

    const onSubmit = (data) => {
        console.log(data);
        userLogin(data.email, data.password)
    }

    return (
        <div className='Auth'>
            <h1 className="Auth__title">Login</h1>
            <Form className='Auth__form' onSubmit={handleSubmit(onSubmit)}>
                <div className='Auth__input-block'>
                    <label>Username</label>
                    <input
                        type='email'
                        {...register("email", {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className={ !isAuth? 'error' : null}
                    />
                    {errors.email ? <p className="error">Email address is invalid</p> : <p>Format email@.ru</p>}
                </div>
                <div className='Auth__input-block'>
                    <label>Password</label>
                    <input
                        type='password'
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
                        })}
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        className={ !isAuth? 'error' : null}
                    />
                    {errors.password ? <p className="error">Password is invalid</p> : <p>Include (a-z), (A-Z), (0-9), min 8 symbols</p>}
                </div>
                { 
                    !isAuth
                        ? <p className='error'>Неверный логин или пароль</p> 
                        : null
                }
                <div className='Auth__btn-block'>
                    <button
                        type='submit'
                        className='green' 
                    >Login</button>
                    <Link to='/register'>Register</Link>
                </div>
            </Form>
            <div className='Auth__btn-google'>
                <button onClick={googleAccount()}>Авторизация с помощью Google</button>
            </div>
        </div>
    );
}

const mapStateToProps = ({todolistReducer}) => {
    return { 
        isAuth: todolistReducer.isAuth,
        isGoogle: todolistReducer.isGoogle
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        userLogin: (name, password) => dispatch(userLogin(name, password)),
        googleAccount: () => dispatch(googleAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
