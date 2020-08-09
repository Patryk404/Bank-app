import React,{Component} from 'react';
import Input from '@material-ui/core/Input';
import classes from './Editpanel.module.css';
import Layout from '../../hoc/Layout/Layout';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import back from '../../assets/images/back.png';
import { Button } from '@material-ui/core';

class EditPanel extends Component {
    state = {
        name: '',
        surname: '', 
        login: '',
        email: '',
        cash: '',
        bill: '',
        loading: true
    };
    componentDidMount(){
        this.setState({loading:true});
        axios.get('https://bank-app-github.herokuapp.com/admin/user/'+this.props.match.params.id,{headers:{
            'Content-Type': 'application/json',
            "Authorization": 'Bearer '+localStorage.token
        }}).then(response =>{
            this.setState({
                name: response.data.user.name,
                surname: response.data.user.surname,
                login: response.data.user.login,
                email: response.data.user.email, 
                cash: response.data.user.cash,
                bill: response.data.user.bill,
                loading: false
            });
        })
        .catch(err=>{
            console.log(err);
        })
    };
    inputHandler = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    editUserButtonHandler = ()=>{
        this.setState({loading: true});
        axios.put('https://bank-app-github.herokuapp.com/admin/user/edit/'+this.props.match.params.id,{
            name: this.state.name,
            surname: this.state.surname,
            login: this.state.login,
            email: this.state.email,
            cash: this.state.cash,
            bill: this.state.bill
        },{headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.token
        }}).then(response=>{
            this.setState({loading: false});
            alert('Succesfully edited user :D');
            this.props.history.push({pathname: '/adminpanel'});
        })
        .catch(err=>{
            console.log(err);
        })
    };

    validateBill = evt =>{
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

    render(){
        return(
            <Layout logged>
            <img onClick={()=>{this.props.history.push({pathname: '/adminpanel'})}} className={classes.img} src={back} alt="Back button"/>
            <h1>
                Editing {this.props.match.params.id}
            </h1>
            { this.state.loading ? <Spinner/> : 
                <div className={classes.box}>
                    <div>
                    <label>Name</label>
                    </div>
                    <Input onChange={this.inputHandler} name="name" type="text" placeholder="Name" value={this.state.name}/>
                    <br/>
                    <div>
                    <label>Surname</label>
                    </div>
                    <Input onChange={this.inputHandler} name="surname" type="text" placeholder="Surname" value={this.state.surname}/>
                    <br/>
                    <div>
                    <label>Login</label>
                    </div>
                    <Input onChange={this.inputHandler} name="login" type="text" placeholder="Login" value={this.state.login}/>
                    <br/>
                    <div>
                    <label>Email</label>
                    </div>
                    <Input onChange={this.inputHandler} name="email" type="email" placeholder="Email" value={this.state.email}/>
                    <br/>
                    <div>
                    <label>Cash</label>
                    </div>
                    <Input onChange={this.inputHandler} name="cash" type="number" placeholder="Cash" value={this.state.cash}/>
                    <br/>
                    <div>
                    <label>Bill</label>
                    </div>
                    <div style={{
                        width: '250px',
                        textAlign: 'center',
                        margin: 'auto'
                    }}>
                    <Input onKeyPress={this.validateBill} onChange={this.inputHandler} name="bill" type="text" placeholder="Bill" value={this.state.bill} fullWidth/>
                    </div>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.editUserButtonHandler}>edit!</Button>
                </div>
            }
            </Layout>
        )
    }
}

export default EditPanel;