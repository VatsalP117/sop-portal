const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//use express sessions and passport google oauth to implement google login

//passport.use() is used to define a new strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //this function is called when the user is authenticated
      //the user profile is passed to the done() function
      try {
        //set type of user based on the emails

        const faculty = await Faculty.findOne({
          email: profile.emails[0].value,
        });
        if (faculty) {
          profile.type = "faculty";
          return done(null, profile);
        }

        if(!profile.emails[0].value.endsWith("@goa.bits-pilani.ac.in")){
          const error = new Error("Please login with your BITS email");
          return done(error, null);
        }

        const student = await Student.findOne({
          email: profile.emails[0].value,
        });
        if (student) {
          profile.type = "student";
          return done(null, profile);
        }

        const new_student = new Student({
          email: profile.emails[0].value,
          name: profile.displayName,
        });

        await new_student.save();

        profile.type = "student";

        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

//serializeUser() and deserializeUser() are used to store the user in the session

//serializeUser() is called when the user logs in
passport.serializeUser(function (user, done) {
  done(null, user);
});

//deserializeUser() is called when the user logs out
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//export the passport object
module.exports = passport;
