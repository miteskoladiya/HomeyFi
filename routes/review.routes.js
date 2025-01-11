const express = require('express');
const router = express.Router({ mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require('../controllers/reviews.controller.js')

// Reviews Post 
router.post("/:id/reviews", isLoggedIn, validateReview, wrapAsync( reviewController.createReview ));

// Reviews Delete 
router.delete("/fire/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync( reviewController.destroyReview ));

module.exports = router;