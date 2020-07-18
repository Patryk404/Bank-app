import React from 'react';
import Button from '../UI/test_button_materialUI/Button'; 
import classes from './Adminpanel.module.css';
import Layout from '../../hoc/Layout/Layout';

class Adminpanel extends React.Component {
    componentDidMount(){
        // fetching users
    };  
    render(){
        return (
            <div className={classes.panel}>
                <Layout logged>
                    <h1>Welcome in admin panel</h1>
                    <Button variant="contained" color="primary">
                        Create new admin account
                    </Button>
                    <br/>
                    <table className={classes.table}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Login</th>
                            <th>Bill</th>
                            <th>Cash</th> 
                        </tr>
                        
                    </table>
                </Layout>
            </div>
        );
    }
}

export default Adminpanel;
