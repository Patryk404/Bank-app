import React from 'react';
import classes from './Signup.module.css';
import Button from '../../UI/Button/Button';

const signup = (props)=>{
        if (!props.message)// if our message is empty 
        {
        return(
                <div className={classes.Signup}>
                        <label>
                                Mail:
                                <input type="text" name="email" onChange={props.change} value={props.user.email}/>
                        </label>
                        <label>
                                Name:
                                <input type="text" name="name" onChange={props.change} value={props.user.name}/>
                        </label>
                        <label>
                                Surname:
                                <input type="text" name="surname" onChange={props.change} value={props.user.surname}/>
                        </label>
                        <label>
                                Login:
                                <input type="text" name="login" onChange={props.change} value={props.user.login}/>
                        </label>
                        <label>
                                Password:
                                <input type="password" name="password" onChange={props.change} value={props.user.password}/>
                        </label>
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