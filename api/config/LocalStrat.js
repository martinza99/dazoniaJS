const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user.js");

passport.use(
	new LocalStrategy(
		async function (username, password, done) {
			const user = await User.getByUsername(username);
			if (user.userID !== undefined) {
				const match = await bcrypt.compare(password, user.password);
				if (match)
					done(null, user, { message: "Logged in" });
				else
					done("Wrong pass", null, { message: "Password incorrect" });
			} else {
				done("Wrong user", null, { message: "User not found" });
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.userID)
});
passport.deserializeUser(async (id, done) => {
	done(null, await User.getById(id))
});