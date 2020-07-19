import React from 'react';
import Button from '../UI/test_button_materialUI/Button'; 
import classes from './Adminpanel.module.css';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableBody } from '@material-ui/core';
import Box from '@material-ui/core/Box';

class Adminpanel extends React.Component {
    state = {
        users: [] 
    };
    componentDidMount(){
        axios.get('http://localhost:3000/admin/users')
        .then(response=>{
            console.log(response.data);
            this.setState({
                users: response.data.users
            });
        });
    };  
    render(){
        let users;
        if (this.state.users)
        {
            users =this.state.users.map(user=>{
                return (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.surname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.login}</TableCell>
                        <TableCell>{user.bill}</TableCell>
                        <TableCell>{user.cash}</TableCell>
                        <TableCell><Button>Edit</Button></TableCell>
                        <TableCell><Button>Delete</Button></TableCell>
                    </TableRow>
                );
            });
        }
        return (
            <div className={classes.panel}>
                <Layout logged>
                    <h1>Welcome in admin panel</h1>
                    <Button variant="contained" color="primary">
                        Create new admin account
                    </Button>
                    <br/>
                    <Box className={classes.Box}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Login</TableCell>
                                    <TableCell>Bill</TableCell>
                                    <TableCell>Cash</TableCell> 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users}
                            </TableBody>
                        </Table>
                        </Box>
                </Layout>
            </div>
        );
    }
}

export default Adminpanel;
