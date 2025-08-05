const path = require('path');
const express = require("express");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const exp = require('constants');

// Built-in body parser for JSON
app.use(express.json());

// Built-in body parser for form data
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(
});

app.listen(3000);