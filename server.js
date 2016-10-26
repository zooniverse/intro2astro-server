const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const Grant = require('grant-express');

const app = express();
const grant = new Grant(); // TODO setup config.json
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(session({ secret: 'grant' }))
app.use(grant);

// Setup routes
require('./app/routes.js')(app);

app.listen(port, function() {
  console.info(`listening on ${port}`);
});