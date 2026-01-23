const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/ai-quiz-app';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Failed:', error.message);
    });

module.exports = mongoose;
