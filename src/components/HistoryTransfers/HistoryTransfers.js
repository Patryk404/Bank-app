import React from 'react';
import classes from './HistoryTransfers.module.css';
import HistoryTransfer from './HistoryTransfer/HistoryTransfer';
import Aux from '../../hoc/Auxiliary/Auxiliary';
const historyTransfers = (props)=>{
    let transfers;
    if (props.history)
    {
        transfers = props.history.map(
            (element,index)=>{// setting list with appropriate key
                return (
                <HistoryTransfer key={index}>{element}</HistoryTransfer>
                );
            }
        )
    }
    else { 
        transfers = null;
    }
    return(
        <Aux>
            <div className={classes.Transfers}>
                <h1 style={{fontSize: '20px',fontWeight: 'normal'}}>History of Transfers</h1>
                    <ul>
                        {transfers}
                    </ul>
            </div>
        </Aux>
    );
}; 

export default historyTransfers;