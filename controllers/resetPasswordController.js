const bcrypt=require('bcryptjs');
const User=require('../models/user');
const {where}=require('sequelize');

exports.resetPassword = async (req, res) => {
    try {
        const { userName, newPassword } = req.body;
        const user = await User.findOne({ where: { userName } });
        if (!user) {
            return res.status(400).json({ msg: 'User Not Found' });
        }

        // Hash New Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.updated_at = new Date();

        await user.save();

        res.status(200).json({ msg: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}