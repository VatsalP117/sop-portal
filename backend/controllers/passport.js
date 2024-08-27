const Faculty = require("../models/Faculty.js");
const Student = require("../models/Student.js");
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
        const faculty = await Faculty.findOne({
          where: { email: profile.emails[0].value },
        });
        if (faculty) {
          profile.type = "faculty";
          profile.id = faculty.id;
          return done(null, profile);
        }

        if (!profile.emails[0].value.endsWith("@goa.bits-pilani.ac.in")) {
          const error = new Error("Please login with your BITS email");
          return done(error, null);
        }

        const student = await Student.findOne({
          where: { email: profile.emails[0].value },
        });
        if (student) {
          profile.type = "student";
          profile.id = student.id;
          return done(null, profile);
        }

        const [new_student, created] = await Student.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            name: profile.displayName,
          },
        });

        profile.id = new_student.id;
        profile.type = "student";

        return done(null, profile);
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
