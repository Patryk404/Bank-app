import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Login from '../Userpanel/Login/Login';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import HistoryTransfers from '../Userpanel/HistoryTransfers/HistoryTransfers';

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
        logged: false,
        loggedUser: {
            transfers: []
        }
    };
    componentDidMount(){
        if (this.state.loggedUser.transfers.length === 0 && localStorage.token)
        {
            axios.get('http://localhost:3000/user/history',{headers:{
                "Authorization": 'Bearer '+localStorage.token
            }})
            .then(response=>{
                const history = response.data.transfers;
                console.log(history);
                const history2 = history.map(element=>{
                    const new_date = element.date.replace('T',' Time: ').split('.')[0];
                    return {
                        cash: element.cash,
                        date: new_date
                    }
                })
                this.setState({
                    loggedUser: {
                        transfers: history2
                    }
                });
            }).catch(err=>{
                console.log(err);
            })
        }
    }
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
            localStorage.token = response.data.token;
            this.setState({
                logged: true
            });
        })
        .catch(err=>{
            this.setState({
                error: err
            });
        })
    }
    refreshPage = ()=>{
        window.location.reload(false);
    }
    render(){
        let userPanel;
        if (this.state.logged === true)
        {
            userPanel = (<Aux>
                <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
                    <p>Succesfully logged into bank</p>
                    <Button click={this.refreshPage}>TAKE ME TO PANEL</Button>
                </Modal>
            </Aux>);
        } 
        else if (localStorage.token)
        {
            userPanel=(
                <Aux>
                    <h1 style={{fontWeight: 'normal'}}>Panel</h1>
                    <div style={{position: 'absolute',
                    width: '100%',
                    top: '200px'}}>
                    <Button>Make Transfer</Button>
                    </div>
                    <div style={{position: 'absolute',// please change this soon 
                    width: '75%',
                    top: '0px',
                    right: '-450px',
                    textAlign: 'none'}}>
                    <Button styled={'red'}>Log Out</Button>
                    </div>
                    <HistoryTransfers history={this.state.loggedUser.transfers}/>
                </Aux>
            );
        }
        else if (this.state.error==='' && this.state.logged===false)
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