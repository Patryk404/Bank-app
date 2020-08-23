import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Login from '../../components/Login/Login';
import Layout from '../../hoc/Layout/Layout';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Signup from '../../components/Signup/Signup';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './HomePanel.module.css';
import {URL} from '../../ApiUrl';

class HomePanel extends Component { // UserPanel component which is containter 
    state = { // state 
        showlogin: false,//to show login modal
        showsignup: false,//to show signup modal
        loading: false,
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
        error: false,//possible error
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
        this.setState({loading: true});
        axios.post(URL + '/signup',this.state.register_user)//passing our body which represents this.state.register_user
        .then(response=>{//setting state to default if we register user
            this.setState({
                message: response.data.message,
                register_user: {
                    email: '',
                    name: '',
                    surname: '',
                    login: '',
                    password: ''
                },
                loading: false
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
                },
                loading: false
            });
        })
    }
    submitLoginHandler = ()=>{// sending post request to login into system
        this.setState({loading: true});
        axios.post(URL + '/login',this.state.user)
        .then(response=>{
            localStorage.token = response.data.token;//seting token in our app storage
            if(response.data.meta){//if we have metadata for admin we can see admin panel
                this.props.setAdmin();
                return this.props.history.push('/adminpanel');
            }
            this.setState({
                logged: true,
                loading: false
            });
            this.props.history.push({pathname: '/userpanel'});

        })
        .catch(err=>{//if we passed wrong informations we setting error
            this.setState({
                error: true,
                loading: false 
            });
        })
    }
    render(){
        return (
        <Aux>
            <Layout>
                      <div style={{fontSize: "30px"}}>
            Hi welcome in our bank!
            <br/>
            Come on look at your money!
          </div>
            <Button click={this.loginButtonHandler}>Log in</Button>
            <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
            {
                 this.state.loading ? <Spinner home/> : this.state.error ? <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} error={'Something went wrong sorry :('}/> : <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} message={this.state.message}/>                
            }
            </Modal>
            <Button click={this.signupButtonHandler}>Register</Button>
            <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
                {
                    this.state.loading ? <Spinner home/> : <Signup submit={this.submitSignupHandler} message={this.state.message} change={this.handleChangeSignup} user={this.state.register_user}/>

                }
            </Modal>
            <p className={classes.paragraph}>
                Did you find bug?
                <br/>
                Call Me <a href="mailto:patryk744@op.pl">patryk744@op.pl</a> 
            </p>
            </Layout>
        </Aux>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setAdmin: ()=>dispatch(actions.setAdmin())
    }
}

export default connect(null,mapDispatchToProps)(HomePanel);

//This code required refactoring we might create new container component if we logged into system. Not