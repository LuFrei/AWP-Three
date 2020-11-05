const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(express.static(path.join(__dirname, "../public")))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api', require('./api'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public'));
})

const PORT = process.env.PORT || 1337;

app.listen(
  PORT,
  console.log( `I'm listening to port: ${PORT}`)
)