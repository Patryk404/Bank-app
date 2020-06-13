import React from 'react';
import logoo from '../../assets/images/logo.png'
import classes from './Logo.module.css';
const logo = (props)=>{
    return (
        <div className={classes.Logo}>
            <img src={logoo} alt="Logo"/>
        </div>
    );
}

export default logo;