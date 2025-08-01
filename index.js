const express = require("express");
const app = express();


// Built-in body parser for JSON
app.use(express.json());

// Built-in body parser for form data
app.use(express.urlencoded({ extended: false }));




app.use('/', (req, res, next) => {
   res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);