const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
require('dotenv').config({ path: 'env' });
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json(), urlencodedParser);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true});

const connection= mongoose.connection;
connection.once('open',()=> {
    console.log("MongoDb database is succesfully established succesfully");
});

const flightsRouter = require('./routes/flights');
const usersRouter = require('./routes/users');
const reservationsRouter = require('./routes/reservations');
const testRouter = require('./routes/test');

app.use('/test',testRouter);
app.use('/flights', flightsRouter);
app.use('/users',usersRouter);
app.use('/reservations', reservationsRouter);


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});