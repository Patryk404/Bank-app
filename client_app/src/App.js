import React from 'react';
import classes from './App.module.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import HomePanel from './components/HomePanel/HomePanel';
import UserPanel from './components/Userpanel/UserPanel'; 
function App() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePanel} />
          <Route path='/userpanel' exact component={UserPanel}/>
          <Route render={()=><h1>You cannot reach this page sorry!</h1>}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
      }

export default App;
