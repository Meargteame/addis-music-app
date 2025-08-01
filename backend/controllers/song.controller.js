const Song = require('../models/song.model');

const getSongs = async (req, res) => {
    try {
        const { genre, search, limit = '20', offset = '0' } = req.query;
        const query = {};

        if (genre) {
            query.genre = { $regex: genre, $options: 'i' };
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { artist: { $regex: search, $options: 'i' } },
                { album: { $regex: search, $options: 'i' } },
            ];
        }

        const songs = await Song.find(query)
            .sort({ date_added: -1 })
            .skip(parseInt(offset))
            .limit(parseInt(limit));

        const total = await Song.countDocuments(query);

        const response = {
            songs,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                has_more: parseInt(offset) + songs.length < total,
            },
        };

        res.success(response, `Retrieved ${songs.length} songs`);
    } catch (error) {
        res.error('Error fetching songs: ' + error.message, 500);
    }
};

const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.error('Song not found', 404);
        }
        res.success(song, `Retrieved song: ${song.title}`);
    } catch (error) {
        res.error('Error fetching song: ' + error.message, 500);
    }
};

const createSong = async (req, res) => {
    try {
        const { title, artist } = req.body;
        if (!title || !artist) {
            return res.error('Title and artist are required', 400);
        }

        const newSong = new Song(req.body);
        await newSong.save();
        res.success(newSong, `Song "${newSong.title}" created successfully`);
    } catch (error) {
        res.error('Error creating song: ' + error.message, 500);
    }
};

const updateSong = async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSong) {
            return res.error('Song not found', 404);
        }
        res.success(updatedSong, `Song "${updatedSong.title}" updated successfully`);
    } catch (error) {
        res.error('Error updating song: ' + error.message, 500);
    }
};

const deleteSong = async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong) {
            return res.error('Song not found', 404);
        }
        res.success({ deleted_song_id: req.params.id }, `Song "${deletedSong.title}" deleted successfully`);
    } catch (error) {
        res.error('Error deleting song: ' + error.message, 500);
    }
};

const incrementPlayCount = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.error('Song not found', 404);
        }
        song.play_count = (song.play_count || 0) + 1;
        await song.save();
        res.success({ song_id: song.id, play_count: song.play_count }, `Play count updated for "${song.title}"`);
    } catch (error) {
        res.error('Error updating play count: ' + error.message, 500);
    }
};

const getGenres = async (req, res) => {
    try {
        const genres = await Song.distinct('genre');
        res.success(genres, 'Available genres retrieved successfully');
    } catch (error) {
        res.error('Error fetching genres: ' + error.message, 500);
    }
};

module.exports = {
    getSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
    incrementPlayCount,
    getGenres
};
