const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'top secret string!!! oOoOoOoO!!!'
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer2-2018');

require('./services/user.service.server')(app);

app.listen(3001);
