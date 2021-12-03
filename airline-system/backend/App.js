const express= require('express');
const cors = require('cors');
const mongoose= require('mongoose');
require('dotenv').config({ path: 'env' });
const nodemailer = require('nodemailer');
  
  
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'acltheteam@gmail.com',
        pass: 'Damnpass456'
    }
});
  
let mailDetails = {
    from: 'acltheteam@gmail.com',
    to: 'ziadearth@gmail.com', //to specific email
    subject: 'Test mail',
    text: 'dkvml' //var reservation and the amount to be refunded.
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});





const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true});

const connection= mongoose.connection;
connection.once('open',()=> {
    console.log("MongoDb database is succesfully established succesfully");
});

const flightsRouter = require('./routes/flights');
const usersRouter = require('./routes/users');

app.use('/flights', flightsRouter);
app.use('/users',usersRouter);

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});