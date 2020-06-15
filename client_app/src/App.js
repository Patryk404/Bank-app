import React from 'react';
import classes from './App.module.css';
import UserPanel from './components/Userpanel/Userpanel';
import Layout from './hoc/Layout/Layout';
function App() {
  if (localStorage.token===undefined)//if our token is not defined
  {
    return (
      <div className={classes.App}>
        <Layout>
          <div style={{fontSize: "30px"}}>
            Hi welcome in our bank!
            <br/>
            Come on look at your money!
          </div>
          <UserPanel />
        </Layout>
      </div>
    );
  }
  else {//if we are logged into system
    return (
      <div className={classes.App}>
        <Layout logged={true}>
          <UserPanel />
        </Layout>
      </div>
    )
  }
}

export default App;
