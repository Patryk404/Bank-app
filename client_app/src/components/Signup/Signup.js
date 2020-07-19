import React from 'react';
import classes from './Signup.module.css';
import Button from '../UI/Button/Button';
import Input from '@material-ui/core/Input';

const signup = (props)=>{
        if (!props.message)// if our message is empty 
        {
        return(
                <div className={classes.Signup}>
                        <Input type="text" name="email" onChange={props.change} value={props.user.email} placeholder="Email"/>
                        <Input type="text" name="name" onChange={props.change} value={props.user.name} placeholder="Name"/>
                        <Input type="text" name="surname" onChange={props.change} value={props.user.surname} placeholder="Surname"/>
                        <Input type="text" name="login" onChange={props.change} value={props.user.login} placeholder="Login"/>
                        <Input type="password" name="password" onChange={props.change} value={props.user.password} placeholder="Password"/>
                        <Button click={props.submit}>Signup</Button>
                </div>
        )
        }
        else {
                return (
                <p>{props.message}</p>
                )
        }
};

export default signup;