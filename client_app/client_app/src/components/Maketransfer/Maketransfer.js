import React from 'react';
import Button from '../UI/Button/Button';
import classes from './Maketransfer.module.css';
import Input from '@material-ui/core/Input';
import Spinner from '../UI/Spinner/Spinner';
const MakeTransfer = (props)=>{
    if (props.loading === true){
        return (
            <Spinner/>
        )
    }
    else if (props.message ==='' && props.making_transfer === true)
    {
    return (
        <div className={classes.Maketransfer}>
            <Input type="number" name="cash_to_transfer" onChange={props.change} placeholder="Cash"/>
            <Input type="text" name="bill_to_transfer" onChange={props.change} onKeyPress={props.validate} value={props.bill} placeholder="Bill"/>
            <Button styled={'red'} click={props.submit}>Transfer Cash!</Button>
        <p>{props.error ? "Oh sorry you haven't got any cash or we can't find the appropriate bill" : null}</p>
        </div>
    );
    }
    else { 
        return (
        <p>{props.message}</p>
        );
    }
};

export default MakeTransfer;