import React from 'react'
import classes from './Login.module.css';
import Button from '../../UI/Button/Button';

const login = (props)=>{
        return (
            <div className={classes.Login}>
                <label>
                        Mail:
                        <input type="text" name="email" onChange={props.change} value={props.user.email}/>
                </label>
                <label>
                        Login:
                        <input type="text" name="login" onChange={props.change} value={props.user.login}/>
                </label>
                <label>
                        Password:
                        <input type="password" name="password" onChange={props.change} value={props.user.password}/>
                </label>
                <Button click={props.submit}>Login</Button>
                <br/>
                {props.error}
                {props.message}
          </div>
        );
};

export default login;