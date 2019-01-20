const express = require('express');
const app = express();
const port = 3000;

const { userDb } = require('./db');

app.get('/', (req, res) => {
	userDb.getOneUserById(1)
		.then(data => res.send({'username': data.rows[0].username}))
		.catch(err => console.log(err));
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});