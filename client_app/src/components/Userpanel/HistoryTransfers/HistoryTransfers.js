import React from 'react';
import classes from './HistoryTransfers.module.css';
import HistoryTransfer from './HistoryTransfer/HistoryTransfer';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const historyTransfers = (props)=>{
    const transfers = props.history.map(
        (element,index)=>{// setting list with appropriate key
            return (
            <HistoryTransfer key={index}>{element}</HistoryTransfer>
            );
        }
    )
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