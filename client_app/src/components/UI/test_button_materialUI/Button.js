import React from 'react'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import classess from './Button.module.css';

const style = theme =>{
    return ({
        button_class: {
            padding: '10px',
            display: 'block',
            margin: 'auto',
        },
    }
    );
}

const button = props=>{
    const {classes} = props;
    return(
        <Button variant="contained" color="primary" className={classes.button_class}>
            {props.children}
        </Button>
    )
};

export default withStyles(style)(button);