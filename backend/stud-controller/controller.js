require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey
const {authenticateStudent,createStudent} = require('../stud-db-helper/stud');



exports.register = async (req, res) => {
    const { username, email, password, } = req.body;


    try {
        const newStudent = await createStudent({ username, email, password, role:'student' });
        

        res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { username,email, password } = req.body;
    try {
        const student = await authenticateStudent(username,email, password);
        const token = jwt.sign({ id: student._id,usernam:student.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
       


    } catch (error) {
        res.status(401).json({ message: error.message });
    }   
};

