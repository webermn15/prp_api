const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.get('/', (req, res) => {
	db.query('SELECT * FROM users WHERE id = $1', [1])
		.then(data => res.send({"user": data.rows[0].username}))
		.catch(err => console.log(err));
	
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});