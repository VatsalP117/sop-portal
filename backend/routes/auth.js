const passport = require("../controllers/passport");
const router = require("express").Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}/${req.user.type}`);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(500)
        .json({ message: "Could not log out user", error: err.message });
    }
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        console.error("Session destruction error:", destroyErr);
        return res.status(500).json({
          message: "Error destroying session",
          error: destroyErr.message,
        });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      console.log("Logged out user");
      res
        .status(200)
        .json({ message: "Logout successful", redirectUrl: "/login" });
    });
  });
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    //console.log("mai yaha hu bhai", req.user);
    return res.json({
      email: req.user.emails[0].value,
      type: req.user.type,
      id: req.user.id,
      name: req.user.displayName,
      image: req.user.photos[0].value,
    });
  }
  return res.status(401).json({ message: "User not authenticated" });
});

module.exports = router;
