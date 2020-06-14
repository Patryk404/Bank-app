import React from 'react';
import classes from './HistoryTransfer.module.css';
const historyTransfer = (props)=>{
    return(
        <li className={classes.Transfer}>
            <p>Cash: {props.children.cash}</p>
            <p>Date: {props.children.date}</p>
        </li>
    );
}

export default historyTransfer;