const User = require('../db/User');

exports.createStudent = async (studentData) => {
    try {
        const newStudent = new User(studentData);
        return await newStudent.save();


    }catch (error) {
        throw new Error('Error creating student: ' + error.message);

    }
};

exports.authenticateStudent = async (username,email, password) => {
    try {
        const student = await User.findOne({ username,email,password,role:'student' });
        if (!student) {
            throw new Error('Authentication failed: Invalid email or password');
        }
        return student;
    } catch (error) {
        throw new Error('Error during authentication: ' + error.message);
    }       

};
