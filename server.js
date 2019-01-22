const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const { userDb } = require('./db');

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/api', (req, res) => {
	console.log(req.body);

	userDb.getOneUserById(1)
		.then(data => res.send({'username': data.rows[0].username}))
		.catch(err => console.log(err));
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});