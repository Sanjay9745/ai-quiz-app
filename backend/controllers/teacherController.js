const {createUser,signinUser} =  require('../helpers/teacherHelper');

const jwt = require('jsonwebtoken');
 const register = async (req, res) => {
    try {
        
        const { username, email, passwordHash, role = "teacher" } = req.body;
        const newUser = { username, email, passwordHash, role };
        const createdUser = await createUser(newUser);
        
        res.status(201).json({ success: true, data: createdUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;    
        const user = await signinUser(username, password);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        if(user.role !== 'teacher'){
            return res.status(403).json({ success: false, message: 'Access denied. Not a teacher.' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
   

module.exports = { register, login };