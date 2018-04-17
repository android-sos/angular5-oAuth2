const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const keys = require('../config/keys');

function createToken (user) {
	const payload = {
		iss:'cambista',
		sub: user._id,
		description: user.description,
		privilege: user.privilege,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix()
	}
	return jwt.sign(this.payload, keys.token.secret)
}

router.get('/login',(req,res) => {
	res.render('login', {user: req.user});
});

router.get('/logout',(req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/google', passport.authenticate('google',{
	scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'),(req, res) => {
   res.redirect('/profile');
});


module.exports = router;