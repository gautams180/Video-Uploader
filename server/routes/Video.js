const express = require('express');
const { UploadVideo , getVideos} = require('../controllers/Video');

const router = express.Router();

// Route to upload a video
router.post('/upload', UploadVideo);
router.get('/getVideos', getVideos );


module.exports = router;