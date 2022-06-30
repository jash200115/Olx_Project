const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsyn');
const campgrounds = require('../controllers/campgrounds');
const Campground = require('../models/campground');
const { isLoggedIn , isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get( catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,  catchAsync(campgrounds.createcampground))
    // .post(upload.array('image'),(req,res)=>{
    //     res.send("It");
    // })
    

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showcampground))
    .put(isLoggedIn, isAuthor,  upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));



module.exports = router;