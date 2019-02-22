const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const routes = require('./routes');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// mount routes
routes(app);

app.listen(port, () => {
	console.log(`listening on ${port}, env: ${process.env.NODE_ENV}`);
});