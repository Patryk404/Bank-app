import React from 'react';
import classes from './App.module.css';
import UserPanel from './components/Userpanel/Userpanel';
import Layout from './hoc/Layout/Layout';
function App() {
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

export default App;
