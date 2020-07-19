import React from 'react';
import classes from './App.module.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import HomePanel from './components/HomePanel/HomePanel';
import UserPanel from './components/Userpanel/UserPanel'; 
import AdminPanel from './components/Adminpanel/Adminpanel';
import {connect} from 'react-redux';
function App(props) {
    return (
      <div className={classes.App}>
        <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePanel} />
          <Route path='/userpanel' exact component={UserPanel}/>
          {  props.admin ?
          <Route path='/adminpanel' exact component={AdminPanel}/> :
          null
          } 
          <Route render={()=><h1>You cannot reach this page sorry!</h1>}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
      }

const mapStateToProps = state =>{
  return {
    admin: state.admin
  }
}

export default connect(mapStateToProps)(App);
