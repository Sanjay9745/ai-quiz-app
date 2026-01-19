const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-quiz-app';

mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;