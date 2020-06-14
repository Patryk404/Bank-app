import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './Maketransfer.module.css';
const makeTransfer = (props)=>{
    if (props.message ==='')
    {
    return (
        <div className={classes.Maketransfer}>
            <label>
            Cash:
                <input type="number" name="cash_to_transfer" onChange={props.change} value={props.cash}/>
            </label>
            <label>
            Bill:
                <input type="text" name="bill_to_transfer" onChange={props.change} onKeyPress={props.validate} value={props.bill}/>
            </label> 
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

export default makeTransfer;