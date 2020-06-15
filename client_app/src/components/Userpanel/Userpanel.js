import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Login from './Login/Login';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MakeTransfer from './Maketransfer/Maketransfer';
import Informations from './Informations/Informations';
import Signup from './Signup/Signup';
import axios from 'axios';
import HistoryTransfers from '../Userpanel/HistoryTransfers/HistoryTransfers';

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
        loggedUser: {//our logged user history of transfers
            transfers: []
        },
        showMakeTransfer: false,//showing modal maketransfer
        bill_to_transfer: '',
        cash_to_transfer: 0,
        message_after_transfer: '',
        error_while_transfer: false,
        user_logged: { 
            name: '',
            surname: '',
            cash: 0,
            bill: ''
        }
    };
    componentDidUpdate(){
        if (this.state.showMakeTransfer===true && this.state.cash_to_transfer===0 && this.state.message_after_transfer!=='') //update one time avoiding infinite loop
        {
            axios.get('http://localhost:3000/user/history',{headers:{//geting history of transfer from specific user
                "Authorization": 'Bearer '+localStorage.token
            }})
            .then(response=>{
                const history = response.data.transfers;//this transfers when we getting from API
                const history2 = history.map(element=>{// transform data
                    const new_date = element.date.replace('T',' Time: ').split('.')[0];//transform string
                    return {
                        cash: element.cash,
                        date: new_date
                    }//return object and giving it into array
                })
                this.setState({
                    loggedUser: {
                        transfers: history2
                    },
                    cash_to_transfer: 1 //this is also to avoid infinite loop
                });
            }).catch(err=>{
                console.log(err);
            });
            axios.get('http://localhost:3000/user',{headers:{//getting information about user from API
                "Authorization": 'Bearer '+localStorage.token
            }})
            .then(response=>{
                const data = response.data;
                this.setState({//setting state 
                    user_logged:{
                        name: data.name,
                        surname: data.surname,
                        cash: parseInt(data.cash),
                        bill: data.bill
                    }
                });
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    componentDidMount(){//if we go to next panel components historytransfer and information_user mounting and fetching data
        if (this.state.loggedUser.transfers.length === 0 && localStorage.token)// avoiding unneccessary mounting
        {
            axios.get('http://localhost:3000/user/history',{headers:{//functions is the same like up 
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
            });
            axios.get('http://localhost:3000/user',{headers:{
                "Authorization": 'Bearer '+localStorage.token
            }})
            .then(response=>{
                const data = response.data;
                this.setState({
                    user_logged:{
                        name: data.name,
                        surname: data.surname,
                        cash: parseInt(data.cash),
                        bill: data.bill
                    }
                });
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    handleChangePanel = (event)=>{//handling in make_transfer form
        this.setState({
            [event.target.name]: event.target.value
        });
    }
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
    submitTransferButtonHandler=()=>{//sending request to our api Post with our token
        axios.post('http://localhost:3000/user/transfer',{
            bill: this.state.bill_to_transfer,//post body
            cash: this.state.cash_to_transfer
        },{headers: {"Authorization": 'Bearer '+localStorage.token,// our token to authentication
            'Content-Type': 'application/json'}})
        .then(response=>{//response getting
            this.setState({
                bill_to_transfer: '',//set state to default before we make_transfer
                cash_to_transfer: 0,
                message_after_transfer: response.data.message
            });
        }).catch(err=>{
            console.log(err);
            this.setState({// if we have error setting error state
                error_while_transfer: true
            });
        })
    }
    makeTransferButtonHandler=()=>{
        this.state.showMakeTransfer ? this.setState({showMakeTransfer: false}) : //special syntax to show make_transfer component
        this.setState({showMakeTransfer: true,message_after_transfer: '',error_while_transfer: false,bill_to_transfer: '',cash_to_transfer: 0});//setting state to default and showing modal with make_transfer component
    }
    loginButtonHandler =()=>{
        this.state.showlogin ? this.setState({showlogin: false}) :
        this.setState({showlogin: true});// to show login modal
    };
    signupButtonHandler =()=>{
        this.state.showsignup ? this.setState({showsignup: false}) :
        this.setState({showsignup: true, message: ''});// to show signup modal
    };
    logoutButtonHandler =()=>{
        localStorage.removeItem('token');//removing token from our storage
        this.refreshPage();//refreshing page 
    }
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
    validateBill = (evt)=>{//stackoverflow... to validate if we writing only numbers in our input this is called in our Modal with make_transfer component
        let theEvent = evt || window.event;
        let key;
        // Handle paste
        if (theEvent.type === 'paste') {
           key = evt.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }        let regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    refreshPage = ()=>{//special function to reload page. We simply called this function when we logged into system and logout also
        window.location.reload(false);//refresh page
    }
    render(){
        let userPanel;//variable to take our panel
        if (this.state.logged === true)//if we logged we rendering special modal to take a customer into panel when we after a click on button refresh page
        {
            userPanel = (<Aux>
                <Button click={this.loginButtonHandler}>Login</Button>
                <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
                    <p>Succesfully logged into bank</p>
                    <Button click={this.refreshPage}>TAKE ME TO PANEL</Button>
                </Modal>
            </Aux>);
        } 
        else if (localStorage.token)//if we have token we rendering panel with our history of transfers and information about user
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
                    <Informations user={this.state.user_logged}/>
                </Aux>
            );
        }
        else if (this.state.error==='' && this.state.logged===false)// This is rendering normal if we get site first time
        {
        userPanel = (<Aux>
            <Button click={this.loginButtonHandler}>Log in</Button>
            <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
                <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} message={this.state.message}/>
            </Modal>
            <Button click={this.signupButtonHandler}>Register</Button>
            <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
                <Signup submit={this.submitSignupHandler} message={this.state.message} change={this.handleChangeSignup} user={this.state.register_user}/>
            </Modal>
        </Aux>);
        }
        else {//this render when we get error in login 
        userPanel = (<Aux>
            <Button click={this.loginButtonHandler}>Log in</Button>
            <Modal show={this.state.showlogin} clickonbackdrop={this.loginButtonHandler}>
            <Login user={this.state.user} submit={this.submitLoginHandler} change={this.handleChangeLogin} error={"Something went wrong"}/>
            </Modal>
                <Button click={this.signupButtonHandler}>Register</Button>
            <Modal show={this.state.showsignup} clickonbackdrop={this.signupButtonHandler}>
                <Signup message={this.state.message} submit={this.submitSignupHandler} change={this.handleChangeSignup} user={this.state.register_user}/>
            </Modal>
        </Aux>);
        }
        return(//simply returning this variable
            userPanel
        );
    }
}

export default Userpanel;

//This code required refactoring we might create new container component if we logged into system. Not setting all this information in one container component