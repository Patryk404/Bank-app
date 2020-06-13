import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
class Userpanel extends Component { 
    state = {
        showlogin: false,
        showsignup: false
    }

    loginButtonHandler =()=>{
        this.state.showlogin ? this.setState({showlogin: false}) :
        this.setState({showlogin: true});
    };
    signupButtonHandler =()=>{
        this.state.showsignup ? this.setState({showsignup: false}) :
        this.setState({showsignup: true});
    };
    render(){
        return(
            <Aux>
                <Button click={this.loginButtonHandler}>Log in</Button>
                <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}/>
                <Button click={this.signupButtonHandler}>Register</Button>
                <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}/>
            </Aux>
        );
    }
}

export default Userpanel;