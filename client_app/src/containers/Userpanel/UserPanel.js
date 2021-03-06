import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import openSocket from 'socket.io-client';
import MakeTransfer from '../../components/Maketransfer/Maketransfer';
import HistoryTransfers from '../../components/HistoryTransfers/HistoryTransfers';
import Informations from '../../components/Informations/Informations';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import classes from './UserPanel.module.css';
import {URL} from '../../ApiUrl';


class Userpanel extends Component {
    state ={ 
        showMakeTransfer: false,
        error_while_transfer: null,
        bill_to_transfer: '',
        cash_to_transfer: 0,
        message_after_transfer: '',
        making_transfer: false,
        loading: false,
        loggedUser:{
            transfers:[],
            name: '',
            surname: '',
            cash: null,
            bill: ''
        }
    }
    componentDidUpdate(){
        if (this.state.showMakeTransfer===true && this.state.making_transfer===true  && this.state.message_after_transfer!=='') //update one time avoiding infinite loop
        {
            axios.get(URL+'/user/history',{headers:{//geting history of transfer from specific user
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
                const user = {...this.state.loggedUser};
                //console.log(history2.cash);
                this.setState(prevState=>({
                    loggedUser: {
                        transfers: history2,
                        name: user.name,
                        surname: user.surname,
                        cash: user.cash-prevState.cash_to_transfer,
                        cash_to_transfer: 0,
                        bill: user.bill
            },
                    making_transfer: false
                }));
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    componentDidMount(){//if we go to next panel components historytransfer and information_user mounting and fetching data
        const socket = openSocket(URL);
        socket.on('make_transfer', data=>{
            if(data.bill === this.state.loggedUser.bill) // update only that user with this bill 
            {
                console.log(data);
                const transferss = [...this.state.loggedUser.transfers]; //fix bug
                transferss.unshift({
                    cash: data.cash,
                    date: data.date
                });
                this.setState(prevState=>{ return {
                    loggedUser: {
                        ...prevState.loggedUser,
                        transfers: transferss,
                        cash: parseInt(prevState.loggedUser.cash) + parseInt(data.cash)
                    }
                }});
            }
        });
        if (this.state.loggedUser.transfers.length === 0 && localStorage.token)// avoiding unneccessary mounting
        {
            axios.get(URL+'/user/history',{headers:{//functions is the same like up 
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
                axios.get( URL + '/user',{headers:{
                    "Authorization": 'Bearer '+localStorage.token
                }})
                .then(response=>{
                    const data = response.data;
                    const transfers = [...this.state.loggedUser.transfers];
                    this.setState({
                        loggedUser: {
                            transfers: transfers,
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
            }).catch(err=>{
                console.log(err);
            });
        }
    }
    makeTransferButtonHandler=()=>{
        this.state.showMakeTransfer ? this.setState({showMakeTransfer: false}) : //special syntax to show make_transfer component
        this.setState({showMakeTransfer: true,message_after_transfer: '',error_while_transfer: false,bill_to_transfer: '',cash_to_transfer: 0,making_transfer: true});//setting state to default and showing modal with make_transfer component
    }
    handleChangePanel = (event)=>{//handling in make_transfer form
        this.setState({
            [event.target.name]: event.target.value
        });
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
    logoutButtonHandler =()=>{
        localStorage.removeItem('token');//removing token from our storage
        this.props.history.push({pathname: '/'});
    }
    submitTransferButtonHandler=()=>{//sending request to our api Post with our token
        this.setState({
            making_transfer: true,
            loading: true
        });
        axios.post(URL+'/user/transfer',{
            bill: this.state.bill_to_transfer,//post body
            cash: this.state.cash_to_transfer
        },{headers: {"Authorization": 'Bearer '+localStorage.token,// our token to authentication
            'Content-Type': 'application/json'}})
        .then(response=>{//response getting
            this.setState({
                bill_to_transfer: '',//set state to default before we make_transfer
                message_after_transfer: response.data.message,
                loading: false
            });
        }).catch(err=>{
            console.log(err);
            this.setState({// if we have error setting error state
                error_while_transfer: true,
                loading: false
            });
        })
    }

    render(){
        if (localStorage.token)
        {
            return (
                <Aux>
                    <div className={classes.Panel}>
                        <Layout logged>
                        <h1 style={{fontWeight: 'normal'}}>Panel</h1>
                        <div >
                        <Button styled={'red'} click={this.logoutButtonHandler}>Log Out</Button>
                        <Button click={this.makeTransferButtonHandler} >Make Transfer</Button>
                        <Modal show={this.state.showMakeTransfer} clickonbackdrop={this.makeTransferButtonHandler}>
                            <MakeTransfer error={this.state.error_while_transfer} bill={this.state.bill_to_transfer} cash={this.state.cash_to_transfer} change={this.handleChangePanel} submit={this.submitTransferButtonHandler} validate={this.validateBill} message={this.state.message_after_transfer} making_transfer={this.state.making_transfer} loading={this.state.loading}/>
                        </Modal> 
                        </div>
                        <HistoryTransfers history={this.state.loggedUser.transfers}/>
                        <Informations user={this.state.loggedUser}/>
                        </Layout>
                    </div>
                </Aux>
            );
        }
        else {
            return(
            <h1>Really? You are not logged</h1>
            );
        }
    }
}

export default Userpanel;