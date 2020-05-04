const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');

//JWT Strategy
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: 'frugaleyeauthentication'
}, async (payload, done) => {
	try {
		console.log(payload)
		const user = await User.findById(payload.sub);
		if(!user) {
			return done(null, false);
		}
		done(null, user);
	} catch(error) {
		done(error, false);
	}
}));

//Local Strategy
passport.use(new LocalStrategy({
	usernameField: 'username'
}, async (username, password, done) => {
	try {
		const user = await User.findOne({ username: username });
		if (!user) {
			return done(null, false);
		}
		const isMatch = await user.isValidPassword(password);

		if (!isMatch) {
			return done("Incorrect password");
		}

		done(null, user);
	} catch (error) {
		console.log(error)
		done(error, false);
	}
}));