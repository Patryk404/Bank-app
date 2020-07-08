import React from 'react';
import classes from './Spinner.module.css';

const spinner = props=>{
    if (!props.home)
    {
        return (
            <div className={classes.loader}> 
            </div>);
    }
    else {
        return (
            <div className={classes.loader_home}> 
            </div>);
    }
};

export default spinner;