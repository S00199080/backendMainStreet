const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const userinfo = require('./routes/api');

const app = express();
const port = 3000;

const connectionString = 'mongodb://localhost:27017/users'

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});


app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/userinfo', userinfo);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))