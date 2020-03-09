const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');
const app = express();

app
  .use(express.static(__dirname + '/views'))
  .use(cors())
  .use(bodyParser.json())
  .use(cookieParser())
  .use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
