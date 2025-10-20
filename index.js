const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require("./controllers/error");

const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
   collection: 'sessions'
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "my secret", 
    resave: false, 
    saveUninitialized: false,
    store: store
   })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
   if (!req.session.user) {
    return next();
   }
  User.findById(req.session.user._id)
    .then((user) => {
     if(!user) {
      return next();
    }
    req.user = user;
    next();
  })
    .catch(err => {
      throw new Error(err);
    });    
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = false; // set true to simulate logged-in
//   next();
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.get("/500", errorController.get500);
app.use(errorController.get404);


const PORT = process.env.PORT || 6000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
   console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
  });
