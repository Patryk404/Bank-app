import React from 'react';
import classes from './Button.module.css';
const button = (props)=>{
    let style = [];
    style.push(classes.Button);
    if (props.styled==='red')
    {
        style.push(classes.Red);
    }
    return(
    <button className={style.join(' ')} onClick={props.click}>{props.children}</button>
    );
}

export default button;