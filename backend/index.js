const express = require("express");

require("dotenv").config();
require("./controllers/db");
const AuthRouter = require("./routes/auth");
const studentRouter = require("./routes/student");
const facultyRouter = require("./routes/faculty");
const {
  studentMiddleware,
  facultyMiddleware,
} = require("./controllers/middleware");
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRouter);

app.use("/api/student", studentMiddleware, studentRouter);

app.use("/api/faculty", facultyMiddleware, facultyRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const mailOptions = {
//   from: "csistest0@gmail.com",
//   to: "vatsal4011@gmail.com",
//   subject: "Hello from Nodemailer",
//   text: "This is a test email sent using Nodemailer.",
// };
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error sending email: ", error);
//   } else {
//     console.log("Email sent: ", info.response);
//   }
// });
// console.log("from index",transporter);
// module.exports = {transporter};
