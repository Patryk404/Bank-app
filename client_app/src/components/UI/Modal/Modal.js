import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const modal = (props)=> {
    return (
        <Aux>
            <Backdrop show={props.show} click={props.clickonbackdrop}/>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',//animtion if our props show is true or not 
                    opacity: props.show ? '1' : '0' // visibility 
               }}>
               {props.children}
            </div>
        </Aux>
    );
}

export default modal;