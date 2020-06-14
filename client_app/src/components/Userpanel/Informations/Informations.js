import React from 'react';
import classes from './Informations.module.css';
const informations = (props)=>{
    return(
        <div className={classes.Informations}>
            <h1>Informations</h1>
            <ul>
            <li><h2 style={{fontSize: '36px'}}>{props.user.name} {props.user.surname}</h2></li>
            <li><h3>Cash: {props.user.cash}</h3></li>
            <li><h3>Bill Number: {props.user.bill}</h3></li>
            </ul>
        </div>
    );
}

export default informations;