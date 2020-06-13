import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Login from '../Userpanel/Login/Login';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';

class Userpanel extends Component { 
    state = {
        showlogin: false,
        showsignup: false,
        user: {
            email: '',
            login: '',
            password: ''
        },
        error: '',
        message: ''
    };

    handleChange = (event)=>{
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }
    loginButtonHandler =()=>{
        this.state.showlogin ? this.setState({showlogin: false}) :
        this.setState({showlogin: true});
    };
    signupButtonHandler =()=>{
        this.state.showsignup ? this.setState({showsignup: false}) :
        this.setState({showsignup: true});
    };
    submitLoginHandler = ()=>{
        console.log(this.state.user);
        axios.post('http://localhost:3000/login',this.state.user)
        .then(response=>{
            this.setState({
                message: response.data.message
            });
        })
        .catch(err=>{
            this.setState({
                error: err
            });
        })
    }
    render(){
        let userPanel;
        if (this.state.error==='')
        {
        userPanel = (<Aux>
            <Button click={this.loginButtonHandler}>Log in</Button>
            <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
                <Login submit={this.submitLoginHandler} change={this.handleChange} message={this.state.message}/>
            </Modal>
            <Button click={this.signupButtonHandler}>Register</Button>
            <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
            </Modal>
        </Aux>);
        }
        else {
        userPanel = (<Aux>
        <Button click={this.loginButtonHandler}>Log in</Button>
        <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
            <Login submit={this.submitLoginHandler} change={this.handleChange} error={"Something went wrong"}/>
        </Modal>
        <Button click={this.signupButtonHandler}>Register</Button>
        <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
        </Modal>
    </Aux>);
        }
        return(
            userPanel
        );
    }
}

export default Userpanel;