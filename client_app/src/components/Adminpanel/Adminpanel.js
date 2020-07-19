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
import Modal from '../UI/Modal/Modal';
import Input from '@material-ui/core/Input';

class Adminpanel extends React.Component {
    state = {
        users: [],
        modal_show: false,
        new_admin: {
            email: '',
            login: '',
            password: ''
        }
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

    click_new_admin=()=> {
        this.setState(prevstate=>({
            modal_show: !prevstate.modal_show
        }));
    }
    submit_new_admin=()=>{
        axios.post('http://localhost:3000/admin/new_admin',{
            email: this.state.new_admin.email, 
            login: this.state.new_admin.login,
            password: this.state.new_admin.password
        },{headers:{
            'Content-Type': 'application/json'
        }})
        .then(response=>{
            console.log(response.data.message);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    handleChange = event=>{
        this.setState({
            new_admin:{
                ...this.state.new_admin,
                [event.target.name]: event.target.value
            }
        });
    }

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
                    <Button onClick={this.click_new_admin} variant="contained" color="primary">
                        Create new admin account
                    </Button>
                    <Modal show={this.state.modal_show} clickonbackdrop={this.click_new_admin}>
                        <div className={classes.modal}>
                            <Input type='email' name="email" onChange={this.handleChange} placeholder="Email"/>
                            <Input type='text' name="login" onChange={this.handleChange} placeholder="Login"/>
                            <Input type='text' name="password" onChange={this.handleChange} placeholder="Password"/>
                            <br/>
                            <br/> {
                                //idk why two xD
                            }
                            <Button onClick={this.submit_new_admin}>Create</Button>
                        </div>
                    </Modal>
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
