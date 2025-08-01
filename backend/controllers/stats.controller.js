const Song = require('../models/song.model');
const User = require('../models/user.model');

const getStats = async (req, res) => {
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = (await Song.distinct('artist')).length;
        const totalPlays = (await Song.aggregate([
            { $group: { _id: null, total: { $sum: '$play_count' } } }
        ]))[0]?.total || 0;

        const newestSong = await Song.findOne().sort({ date_added: -1 });
        const user = await User.findOne();

        const genreCounts = await Song.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const popularGenres = genreCounts.reduce((acc, item) => {
            if(item._id) acc[item._id] = item.count;
            return acc;
        }, {});

        const stats = {
            total_songs: totalSongs,
            total_artists: totalArtists,
            popular_genres: popularGenres,
            total_plays: totalPlays,
            newest_song: newestSong?.title || null,
            user_stats: user?.stats || {}
        };

        res.success(stats, 'Statistics retrieved successfully');
    } catch (error) {
        res.error('Error fetching stats: ' + error.message, 500);
    }
};

module.exports = {
    getStats
};
