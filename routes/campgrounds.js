const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { campgroundSchema, reviewSchema } = require("../schemas.js");
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require('../controllers/campgrounds');
const { storage } = require('../cloudinary');

const multer = require('multer');
const upload = multer({ storage });



router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))



router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;

