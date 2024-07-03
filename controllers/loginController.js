const bcrypt=require('bcryptjs');
const User=require('../models/user');
const {where}=require('sequelize');

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ where: { userName } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        // Create Session
        req.session.user = { id: user.id, userName: user.userName };
        res.json({ msg: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}