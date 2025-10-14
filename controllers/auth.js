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

      // Hash password and create user
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
          // Redirect immediately after signup
          res.redirect("/login");

          
          return transporter.sendMail({
            from: `Smart Researcher <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Welcome to Smart Researcher 🎉",
            text: `Hello ${email},\n\nThank you for signing up on our platform! We're excited to have you onboard.\n\nBest regards,\nThe Smart Researcher Team.`,
            html: `<h2>Welcome, ${email}!</h2>
                   <p>Thanks for signing up on our platform. We're excited to have you onboard.</p>
                   <p>Best regards,<br><strong>The Smart Researcher Team</strong></p>`,
          });
        })
        .then((info) => {
          console.log("✅ Signup email sent successfully:", info);
        })
        .catch((err) => {
          console.log("❌ Error during signup:", err);
        });
    })
    .catch((err) => {
      console.log("❌ Database lookup error:", err);
    });
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
//       return bcrypt
//         .hash(password, 12)
//         .then((hashedPassword) => {
//           const user = new User({
//             email: email,
//             password: hashedPassword,
//             cart: { items: [] },
//           });
//           return user.save();
//         })
//         .then((result) => {
//           res.redirect("/login");
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};


exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Signup',
    errorMessage: message
  });
};