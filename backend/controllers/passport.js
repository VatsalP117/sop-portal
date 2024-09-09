const User = require("../models/User.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({
          where: { users_email_id: profile.emails[0].value },
        });

        if (user) {
          let t = user.users_type.match(/student/i) ? "student" : "faculty";
          profile.type = t;
          profile.id = user.users_id;
          return done(null, profile);
        }

        // If user doesn't exist, don't create a new one and return an error
        const error = new Error("User not found in the system");
        return done(error, null);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
