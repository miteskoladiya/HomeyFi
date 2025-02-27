const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require('../controllers/listings.controller.js');
const multer  = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


// Index Route and Create Post Route using (router.route) ↓
router
 .route("/")
 .get( wrapAsync( listingController.index ))
 .post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync ( listingController.createListing ));


// Create New Page Route ↓
router.get("/new", isLoggedIn, listingController.renderNewForm );


// Listing Show with Reviews, Listing Update and Listing Delete Route using (router.route) ↓
router
 .route("/:id")
 .get( wrapAsync( listingController.showListing ))
 .put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync( listingController.updateListing ))
 .delete( isLoggedIn, isOwner,  wrapAsync( listingController.destroyListing ));


// Edit Page Route ↓
router.get("/edit/:id", isLoggedIn, isOwner, wrapAsync( listingController.renderEditForm ));


module.exports = router;
// //index route
// router.get("/", wrapAsync(index));

//create


// //create route
// router.post("/", isLoggedIn, validateListings, wrapAsync(createListing));

//read-show route
// router.get("/:id", wrapAsync(showListing));

//edit route
//update route

// router.put(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     validateListings,
//     wrapAsync(updateListing)
// );

//delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(destroyListing));