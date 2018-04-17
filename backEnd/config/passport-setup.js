const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
        done(null, user);
	});
});

passport.use(
	new GoogleStrategy({
	// options for google strategy
	project_id:"oauth-cambista",
	callbackURL: '/auth/google/redirect',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    // passport callback function
    //console.log('passport callback function fired');
    //console.log(profile);
      
        const currentUser = await User.findOne({
        	googleId: profile.id
        })
		
		if(currentUser){
			done(null, currentUser);
		} else{
			const newUser =  new User({
				method:'google',
				username: profile.displayName,
				googleId: profile.id,
				thumbnail: profile._json.image.url
			});
			await newUser.save();
			if (newUser){
			done(null, newUser);
			}
		}     
   })
);