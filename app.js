if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express()
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExError = require("./utils/ExError.js");
const listingRouter = require("./routes/listings.routes.js");
const reviewRouter = require("./routes/review.routes.js");
const userRouter = require("./routes/user.routes.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.model.js");

//const Mongo_url = "mongodb://127.0.0.1:27017/HomeyFi";
const Mongo_url = process.env.ATLAS_DB;

main()
    .then(() => {
        console.log("Successfully Connected MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(Mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", engine);

const store = MongoStore.create({
    mongoUrl: Mongo_url,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in MONGODB SESSION", err);
});

// Session MiddleWare Define 
const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


// Session, Connect-flash Middlewere 
app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});


// Router Middle Ware 
app.use("/listings", listingRouter);
app.use("/listings", reviewRouter);
app.use("/", userRouter);


app.all("*", (req, res, next) => {
    next(new ExError(404, "Page Not Found !!"));
});

// Wrong Data Insert Error Handling Middle Ware 
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong..." } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("listning port 8080");
});
