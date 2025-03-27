const getCurrentUser = (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            user: req.user,
        });
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
};

const loginSuccess = (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            user: req.user,
        });
    } else {
        res.status(401).json({ success: false, message: 'Login failed' });
    }
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        req.session.destroy(() => {
            res.redirect('http://localhost:3000/login');
        });
    });
};

module.exports = {
    getCurrentUser,
    loginSuccess,
    logout,
};