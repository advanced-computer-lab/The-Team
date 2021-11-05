const express= require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose= require('mongoose');
require('dotenv').config();

//app
const app = express();

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//db connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useUnifiedTopology: true});
const connection= mongoose.connection;
connection.once('open',()=> {
    console.log("MongoDb database is succesfully established succesfully");
});

// routes
const flightsRouter = require('./routes/flights');
const authRoutes = require("./routes/authRoutes");

// routes middleware
app.use('/api', authRoutes);
app.use('/flights', flightsRouter);

//port
const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});
