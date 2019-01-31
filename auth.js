/*
* react app *
*/

import auth0 from 'auth0-js';

const webAuth = new auth0.WebAuth({
	// auth0 tenant hostname
	domain: 'websdev.auth0.com',
	// react client setting
	client_id: process.env.AUTHO_CLIENT_ID,
	callback_url: 'https://react_route_where_auth0_sends_auth_information',
	// api settings
	audience: 'name of api the tokens are requested for, set up in api settings section'
});

// auth trigger code
<button onClick={() => webAuth.authorize()} />

// callback route parser
webAuth.parseHash((err, authResult) => {
	// idToken is the JWT containing the authenticated users info
	// accessToken is a token to access your API and auth0 APIs (?)
	const { idToken, accessToken } = authResult;
	// auth SDK extracts user info from idToken
	{
		"sub": ___,
		"email": ___,
		"emailVerified": ___,
		"name": ___,
		"picture": ___
		// etc
	} = idToken // json
});

//using the access token to make the api calls
const { accessToken } = authResult;
const headers = {
	Authorization: 'Bearer ' + accessToken
}

const response = await fetch('https://my_api.com/route_to_hit', { header });
const body = await response.json();
return body;


/*
* express api *
*/

// middleware verifies the access tokens and adds the authenticated user to the request object for you POG
// check the NodeJS quickstart for actual implementation, this is just a barebones example

const auth0Middleware = auth0ApiSdk.createMiddleware({
	// auth0 tenet hostname again
	domain: 'websdev.auth0.com',
	// api settings audience again
	audience: 'name of api tokens are for'
});

app.get('/api/login', auth0Middleware, (req, res) => {
	//idToken declaration with destructuring
	const { sub, name } = req.user;
})