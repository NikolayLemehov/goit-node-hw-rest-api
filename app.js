const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes/api');

const a = 'a';
console.log('test', a);

mongoose.set('strictQuery', true);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', router.contacts);
app.use('/api/users', router.users);

app.use((req, res) => {
  res.status(404).json({message: 'Not found'});
});

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err;
  res.status(status).json({message});
});

module.exports = app;
