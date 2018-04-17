const express = require('express');
var path = require('path');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const salesRoutes = require('./routes/sales-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

var htmlPath = path.join(__dirname, '/');

const app = express();

app.set('view engine','ejs');

app.use(cookieSession({
     maxAge: 24 * 60 * 60 * 1000,
     keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://' + keys.mongodb.host + '/' + keys.mongodb.dataBase, () => {
	console.log('connected to mongodb');
});

app.use(express.static(htmlPath));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/sales', salesRoutes);

app.get('/',(req, res) => {
	res.render('home', {user: req.user});
});

app.listen(3000, () => {
   console.log('BackEnd is listening to port 3000');
});