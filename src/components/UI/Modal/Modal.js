import React from 'react';
import classes from './Modal.module.css';
import {CSSTransition} from 'react-transition-group'
import Backdrop from '../Backdrop/Backdrop';
const modal = (props)=> {
    return (
        <>
        <CSSTransition in={props.show} timeout={300} classNames={{
            enter: classes['Modal-enter'],
            enterActive: classes['Modal-enter-active'],
            exitActive: classes['Modal-exit-active'],
            exit: classes['Modal-exit']
        }} mountOnEnter unmountOnExit>
            {
            //<Backdrop show={props.show} click={props.clickonbackdrop}/>
            }
            <div className={classes.Modal}> 
            {props.children}
            </div>
        </CSSTransition>
        <Backdrop show={props.show} click={props.clickonbackdrop}/>
        </>
    );
}

export default modal;