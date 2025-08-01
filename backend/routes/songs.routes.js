const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');

router.get('/', songController.getSongs);
router.get('/genres', songController.getGenres); // Note: This was defined in the mock server, good to have
router.get('/:id', songController.getSongById);
router.post('/', songController.createSong);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);
router.post('/:id/play', songController.incrementPlayCount);


module.exports = router;
