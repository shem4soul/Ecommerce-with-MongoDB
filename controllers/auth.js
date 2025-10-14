const bcrypt = require("bcryptjs");

const User = require("../models/user");
const transporter = require("../config/mailer");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};


// exports.postSignup = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const confirmPassword = req.body.confirmPassword;

//   User.findOne({ email: email })
//     .then((userDoc) => {
//       if (userDoc) {
//         req.flash(
//           "error",
//           "E-Mail exists already, please pick a different one."
//         );
//         return res.redirect("/signup");
//       }

//       // Hash password and create user
//       return bcrypt.hash(password, 12).then((hashedPassword) => {
//         const user = new User({
//           email: email,
//           password: hashedPassword,
//           cart: { items: [] },
//         });
//         return user.save();
//       });
//     })
//     .then((result) => {
//       if (!result) return; // Stop if no user was created

//       // ✅ Send signup notification email here
//       const mailOptions = {
//         from: "smartresearcher82.com", // must be your verified Mailgun sender
//         to: result.email,
//         subject: "Welcome to Our Platform 🎉",
//         text: `Hello ${result.email},\n\nThank you for signing up on our platform! We're excited to have you onboard.\n\nBest regards,\nThe Team.`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log("❌ Error sending signup email:", error);
//         } else {
//           console.log("✅ Signup email sent:", info);
//         }
//       });

//       // Redirect after signup
//       res.redirect("/login");
//     })
//     .catch((err) => {
//       console.log("❌ Signup error:", err);
//       res.redirect("/signup");
//     });
// };


exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
