const express = require('express');
const session = require('express-session');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

// Setup routes
require('./app/routes.js')(app);

app.listen(port, function() {
  console.info(`listening on ${port}`);
});