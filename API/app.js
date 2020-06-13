const express = require('express');
const app = express();
const user = require('./models/user'); 
const historytransfers = require('./models/history-of-transfers'); 
const bodyParser = require('body-parser'); 
const sequelize = require('./utils/database');
const authRoute = require('./routes/auth.js');
const userpanelRoute = require('./routes/userpanel');
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(authRoute);
app.use('/user',userpanelRoute);

app.use((error,req,res,next)=>{//error handling
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message
  });
});

user.hasMany(historytransfers);
historytransfers.belongsTo(user); 

sequelize
.sync()
.then(()=>{
    app.listen(3000);
})

