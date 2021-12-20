const express= require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const path = require("path");
require('dotenv').config({ path: '.env' });


const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true});

const connection= mongoose.connection;
connection.once('open',()=> {
    console.log("MongoDb database is succesfully established succesfully");
});

const flightsRouter = require('./Routes/flights');
const usersRouter = require('./Routes/users');
const reservationsRouter = require('./Routes/reservations');

app.use('/flights', flightsRouter);
app.use('/users',usersRouter);
app.use('/reservations', reservationsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});