const express = require('express');
const router = express.Router();
const upload = require('../../config/multerConfig');
const { uploadBook, getAllUploadedBooks } = require('../../controllers/uploadController');

// POST route for uploading book
router.post('/upload', upload.single('bookFile'), uploadBook);

// GET route for fetching all uploaded books
router.get('/uploaded', getAllUploadedBooks);

module.exports = router;
