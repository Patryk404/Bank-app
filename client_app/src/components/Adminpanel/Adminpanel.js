import React from 'react';
import Button from '../UI/test_button_materialUI/Button'; 
import classes from './Adminpanel.module.css';


class Adminpanel extends React.Component {
    render(){
        return (
            <div className={classes.panel}>
                <h1>Welcome in admin panel</h1>
                <Button variant="contained" color="primary">
                    Create new admin account
                </Button>
                <br/>
                <Button variant="contained" size="large">
                    Give Money!
                </Button>
            </div>
        );
    }
}

export default Adminpanel;