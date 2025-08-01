const express = require("express");
const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Built-in body parser for JSON
app.use(express.json());

// Built-in body parser for form data
app.use(express.urlencoded({ extended: false }));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) =>{
   res.status(404).send('<h>Page not found</h>');
});

app.listen(3000);