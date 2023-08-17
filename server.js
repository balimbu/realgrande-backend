const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routes/allroutes");
const allrouter = require('./routes/allroutes');
const app = express();
app.use(express.json());
// later on added code
const cors = require('cors'); // import CORS module

/* commented this out since we are working on cloud, so no need to specify the localhost: 3000
// pass localhost URL 
let corsOptions = {origin:'http://localhost:3000'};
app.use(cors(corsOptions)); // pass the localhost url in cors 
*/

// removed corsOptions from cors() function call, since we working in cloud
app.use(cors()); // no arguments passed in cors () 


const db = module.exports =()=>{
  try{
    mongoose.connect('mongodb+srv://cluster0.nrd9djl.mongodb.net/realgrande?retryWrites=true&w=majority', 
    { user: process.env.DBUSERNAME, pass: process.env.DBPASSWORD, 
        useNewUrlParser: true, useUnifiedTopology: true })
    console.log("MongoDB Connection is Successful")
  } catch(error){
    console.log(error);
    console.log("MongoDB Connection is failed")
  }
}

db(); // function call that has module exports


app.use('/', allrouter); // using the router
// app.use('/counties', allrouter); 


app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`)
});
