import express from "express";
import { engine } from 'express-handlebars';
import members from './controllers/members.js';
import path from 'path';
import router from './routes/api/members.js'
const __dirname = path.resolve();

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

app.use("/api/members", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))