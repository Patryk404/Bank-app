import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Login from '../Userpanel/Login/Login';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MakeTransfer from '../Userpanel/Maketransfer/Maketransfer';
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
        },
        showMakeTransfer: false,
        bill_to_transfer: '',
        cash_to_transfer: 0,
        message_after_transfer: '',
        error_while_transfer: false
    };
    componentDidUpdate(){
        if (this.state.showMakeTransfer===true && this.state.cash_to_transfer===0 && this.state.message_after_transfer!=='')
        {
            axios.get('http://localhost:3000/user/history',{headers:{
                "Authorization": 'Bearer '+localStorage.token
            }})
            .then(response=>{
                const history = response.data.transfers;
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
                    },
                    cash_to_transfer: 1
                });
            }).catch(err=>{
                console.log(err);
            })
        }
    }
    componentDidMount(){
        if (this.state.loggedUser.transfers.length === 0 && localStorage.token)
        {
            axios.get('http://localhost:3000/user/history',{headers:{
                "Authorization": 'Bearer '+localStorage.token
            }})
            .then(response=>{
                const history = response.data.transfers;
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

    handleChangePanel = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleChangeLogin = (event)=>{
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    }
    submitTransferButtonHandler=()=>{
        axios.post('http://localhost:3000/user/transfer',{
            bill: this.state.bill_to_transfer,
            cash: this.state.cash_to_transfer
        },{headers: {"Authorization": 'Bearer '+localStorage.token}})
        .then(response=>{
            this.setState({
                bill_to_transfer: '',
                cash_to_transfer: 0,
                message_after_transfer: response.data.message
            });
        }).catch(err=>{
            console.log(err);
            this.setState({
                error_while_transfer: true
            });
        })
    }
    makeTransferButtonHandler=()=>{
        this.state.showMakeTransfer ? this.setState({showMakeTransfer: false}) :
        this.setState({showMakeTransfer: true,message_after_transfer: '',error_while_transfer: false,bill_to_transfer: '',cash_to_transfer: 0});
    }
    loginButtonHandler =()=>{
        this.state.showlogin ? this.setState({showlogin: false}) :
        this.setState({showlogin: true});
    };
    signupButtonHandler =()=>{
        this.state.showsignup ? this.setState({showsignup: false}) :
        this.setState({showsignup: true});
    };
    logoutButtonHandler =()=>{
        localStorage.removeItem('token');
        this.refreshPage();
    }
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
    validateBill = (evt)=>{
        let theEvent = evt || window.event;
        let key;
        // Handle paste
        if (theEvent.type === 'paste') {
           key = evt.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        let regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    refreshPage = ()=>{
        window.location.reload(false);
    }
    render(){
        let userPanel;
        if (this.state.logged === true)
        {
            userPanel = (<Aux>
                <Button click={this.loginButtonHandler}>Login</Button>
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
                    <Button click={this.makeTransferButtonHandler}>Make Transfer</Button>
                    <Modal show={this.state.showMakeTransfer} clickonbackdrop={this.makeTransferButtonHandler}>
                        <MakeTransfer error={this.state.error_while_transfer} bill={this.state.bill_to_transfer} cash={this.state.cash_to_transfer} change={this.handleChangePanel} submit={this.submitTransferButtonHandler} validate={this.validateBill} message={this.state.message_after_transfer}/>
                    </Modal>
                    </div>
                    <div style={{position: 'fixed',// please change this soon 
                    width: '75%',
                    top: '0px',
                    left: '800px',
                    textAlign: 'none'}}>
                    <Button styled={'red'} click={this.logoutButtonHandler}>Log Out</Button>
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
                <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} message={this.state.message}/>
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
            <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} error={"Something went wrong"}/>
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