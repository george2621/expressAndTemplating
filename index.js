const { urlencoded } = require("express");
const express = require("express");
const path = require('path');
const logger = require('./middleware/logger.js')
const { engine } = require('express-handlebars')
const members = require('./members');


const app = express();


//handlebars middleware
app.engine("handlebars", engine());
app.set('view engine', "handlebars");

//Home page route
app.get("/", (req, res) => {
    res.render("index", { title: "Members App", members })
})
// app.use(logger);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Set static folder
app.use(express.static(path.join(__dirname, "public")))

app.use("/api/members", require("./routes/api/members.js"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))