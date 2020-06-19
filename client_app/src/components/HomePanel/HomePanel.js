import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Login from './Login/Login';
import Layout from '../../hoc/Layout/Layout';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Signup from './Signup/Signup';
import axios from 'axios';

class Userpanel extends Component { // UserPanel component which is containter 
    state = { // state 
        showlogin: false,//to show login modal
        showsignup: false,//to show signup modal
        user: {//this is when we get informations from login modal
            email: '',
            login: '',
            password: ''
        },
        register_user: {//this is when we get informations from signup modal
            email: '',
            name: '',
            surname: '',
            login: '',
            password: ''
        },
        error: '',//possible error
        message: '',//possible message
        logged: false,//if we logged 
    };
    handleChangeLogin = (event)=>{//handling in login form
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }
    handleChangeSignup = (event)=> {//handling in signup form
        this.setState({
            register_user: {
                ...this.state.register_user,
                [event.target.name]: event.target.value
            }
        });
    };

    loginButtonHandler =()=>{
        this.state.showlogin ? this.setState({showlogin: false}) :
        this.setState({showlogin: true});// to show login modal
    };
    signupButtonHandler =()=>{
        this.state.showsignup ? this.setState({showsignup: false}) :
        this.setState({showsignup: true, message: ''});// to show signup modal
    };
    submitSignupHandler = () =>{ //submit our signup
        axios.post('http://localhost:3000/signup',this.state.register_user)//passing our body which represents this.state.register_user
        .then(response=>{//setting state to default if we register user
            this.setState({
                message: response.data.message,
                register_user: {
                    email: '',
                    name: '',
                    surname: '',
                    login: '',
                    password: ''
                }
            });
        })
        .catch(err=>{
            console.log(err);
            this.setState({//setting default state and message 
                message: 'Something wrong please write correct informations',
                register_user: {
                    email: '',
                    name: '',
                    surname: '',
                    login: '',
                    password: ''
                }
            });
        })
    }
    submitLoginHandler = ()=>{// sending post request to login into system
        axios.post('http://localhost:3000/login',this.state.user)
        .then(response=>{
            localStorage.token = response.data.token;//seting token in our app storage
            this.setState({
                logged: true
            });

        })
        .catch(err=>{//if we passed wrong informations we setting error
            this.setState({
                error: err
            });
        })
    }
    toPanelHandler = ()=>{
        this.props.history.push({pathname: '/userpanel'});
    }
    render(){
        let userPanel;//variable to take our panel
        if (this.state.logged === true)//if we logged we rendering special modal to take a customer into panel when we after a click on button refresh page
        {
            userPanel = (<Aux>
                <Layout>
                          <div style={{fontSize: "30px"}}>
                                Hi welcome in our bank!
                                <br/>
                                Come on look at your money!
                            </div>
                <Button click={this.loginButtonHandler}>Login</Button>
                <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
                    <p>Succesfully logged into bank</p>
                    <Button click={this.toPanelHandler}>TAKE ME TO PANEL</Button>
                </Modal>
                </Layout>
            </Aux>);
        } 
        else if (this.state.error==='' && this.state.logged===false)// This is rendering normal if we get site first time
        {
        userPanel = (<Aux>
            <Layout>
                      <div style={{fontSize: "30px"}}>
            Hi welcome in our bank!
            <br/>
            Come on look at your money!
          </div>
            <Button click={this.loginButtonHandler}>Log in</Button>
            <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
                <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} message={this.state.message}/>
            </Modal>
            <Button>Register</Button>
            <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
                <Signup submit={this.submitSignupHandler} message={this.state.message} change={this.handleChangeSignup} user={this.state.register_user}/>
            </Modal>
            </Layout>
        </Aux>);
        }
        else {//this render when we get error in login 
        userPanel = (<Aux>
            <Layout>
                      <div style={{fontSize: "30px"}}>
            Hi welcome in our bank!
            <br/>
            Come on look at your money!
          </div>
            <Button click={this.loginButtonHandler}>Log in</Button>
            <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
            <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} error={"Something went wrong"}/>
            </Modal>
                <Button click={this.signupButtonHandler}>Register</Button>
            <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
                <Signup message={this.state.message} submit={this.submitSignupHandler} change={this.handleChangeSignup} user={this.state.register_user}/>
            </Modal>
            </Layout>
        </Aux>);
        }
        return(//simply returning this variable
            userPanel
        );
    }
}

export default Userpanel;

//This code required refactoring we might create new container component if we logged into system. Not setting all this information in one container component