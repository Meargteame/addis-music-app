const User = require('../models/user.model');

const getUser = async (req, res) => {
    try {
        const user = await User.findOne(); // Gets the first user found
        if (!user) {
            return res.error('User not found', 404);
        }
        res.success(user, 'User profile retrieved successfully');
    } catch (error) {
        res.error('Error fetching user: ' + error.message, 500);
    }
};

module.exports = {
    getUser
};
