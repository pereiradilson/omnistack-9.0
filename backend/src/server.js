require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGOBD_USER}:${process.env.MONGOBD_PASS}@omnistack9-rtpcd.mongodb.net/omnistack9?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3333);