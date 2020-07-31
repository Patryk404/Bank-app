import React from 'react';
import logoo from '../../assets/images/logo.png'
import classes from './Logo.module.css';
const logo = (props)=>{//logo if we are logged or not 
    if (!props.logged)
    {
        return (
            <div className={classes.Logo}>
                <img src={logoo} alt="Logo"/>
            </div>
        );
    }
    else {
        return (
            <div className={classes.Logo_logged}>
                <img src={logoo} alt="Logo"/>
            </div>
        );
    }
}

export default logo;