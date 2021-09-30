const express = require("express");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const ms = require("ms");
const ejs = require("ejs"); 
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.static("public"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, OPTIONS"
    );
    next();
});

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

const IndexRequestsLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 60, // start blocking after 60 requests
    message:
        "Bu IP üzerinden çok fazla istek geldi. Lütfen 1 dakika sonra tekrar deneyin.",
});


app.get("/", IndexRequestsLimiter, async (req, res) => {
res.render("index.ejs", {});
}); 


app.get("/yonlendir", IndexRequestsLimiter, async (req ,res) => {
let query = req.query.url;
if(!query) return res.status(400).redirect("/");
res.render("yonlendir.ejs", {query});
});

app.listen(process.env.PORT || process.env.port || 3131, () => {
  console.log("Back-end Server Is Running aq")
});