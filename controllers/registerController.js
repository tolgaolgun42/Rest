const { where } = require('sequelize');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { userName, password } = req.body;
        let user = await User.findOne({ where: { userName } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create New User
        user = await User.create({
            userName,
            password: hashedPassword,
            created_at: new Date()
        });
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}