import React from 'react';
import classes from './Informations.module.css';
const informations = (props)=>{
    return(
        <div className={classes.Informations}>
            <h1>Informations</h1>
            <ul>
            <li><h2>{props.name_and_surname}</h2></li>
            <li><h3>Cash: {props.cash}</h3></li>
            </ul>
        </div>
    );
}

export default informations;