import React from 'react'
import classes from './Login.module.css';
import Button from '../../UI/Button/Button';

import Input from '@material-ui/core/Input';

const login = (props)=>{
        return (
            <div className={classes.Login}>
                <Input type="text" name="email" onChange={props.change} value={props.user.email} placeholder="Email"/>
                <Input type="text" name="login" onChange={props.change} value={props.user.login} placeholder="Login"/>
                <Input type="password" name="password" onChange={props.change} value={props.user.password} placeholder="Password"/>
                <Button click={props.submit}>Login</Button>
                <br/>
                {props.error}
                {props.message}
          </div>
        );
};

export default login;