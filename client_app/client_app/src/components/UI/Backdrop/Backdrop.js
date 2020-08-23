import React from 'react';
import classes from './Backdrop.module.css';
const backdrop = (props) =>(// our black behind modal 
    props.show ? <div className={classes.Backdrop} onClick={props.click}></div> : null
);

export default backdrop;