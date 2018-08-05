const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const MONGODB_URI = process.env.MONGODB_URI;

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
mongoose.connect(MONGODB_URI);

require('./services/section.service.server')(app);
require('./services/user.service.server')(app);

app.listen(process.env.PORT || 3001);
