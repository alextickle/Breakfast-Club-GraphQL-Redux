const express = require('express');
const bodyParser = require('body-parser');
const schema = require('./schema').schema;
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const path = require('path');
const PORT = process.env.PORT || 4000;
const User = require('./models').User;
const cors = require('cors');

const app = express();

// Enable CORS for everything, per https://www.npmjs.com/package/cors
app.use(cors());

// Also required for CORS, per https://stackoverflow.com/a/11182153/694080 ,
// https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());

app.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress({
		schema
	})
);

app.use(
	'/graphiql',
	graphiqlExpress({
		endpointURL: '/graphql'
	})
);

app.put('/login', function(request, response) {
	console.log('body', request.body);
	User.findOne({
		where: { email: request.body.email }
	}).then(user => {
		if (user && user.verifyPassword(request.body.password)) {
			response.status(200);
			response.json({
				message: 'Success!',
				user: user
			});
		} else {
			response.status(400);
			response.json({ message: 'invalid email and/or password' });
		}
	});
});

app.put('/signup', function(request, response) {
	User.create({
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		neighborhood: request.body.neighborhood,
		password: request.body.password
	})
		.then(user => {
			response.status(200);
			response.json({ message: 'success', user: user });
		})
		.catch(error => {
			response.status(400);
			response.json({ message: 'Unable to create user', errors: error.errors });
		});
});

app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, function() {
		console.log(`listening on port ${PORT}!`);
	});
}

module.exports = app;
