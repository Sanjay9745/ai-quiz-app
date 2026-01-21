const User = require('../db/User');

exports.createUser = async function(newUser) {
    try {
        const user = new User(newUser);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};
exports.signinUser = async function(username, password) {
    try {
        const user = await User.findOne({ username, password });
        return user;
    } catch (error) {
        throw error;
    }       
};