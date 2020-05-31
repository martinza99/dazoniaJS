const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("./models/user");

/**
 * @param {passport} passport
 */
function init(passport) {
	passport.use(
		new LocalStrategy(async function(username, password, done) {
			const user = await User.getByUsername(username);
			if (user.userID!==undefined) {
				if (await bcrypt.compare(password, user.password))
					return done(null, user, { message: "Logged in" });
				else
					return done(null, false, { message: "Password incorrect" });
			} else {
				return done(null, false, { message: "User not found" });
			}
		})
	);

	passport.serializeUser((user, done) => done(null, user.userID));
	passport.deserializeUser((id, done) => done(null, User.getByIdSync(id)));
}

module.exports = init;
