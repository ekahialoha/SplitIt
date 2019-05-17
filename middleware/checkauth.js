const checkAuth = (req, res, next) => {
    if(!req.session.user) {
        res.status(401).json({
            message: 'not-authed'
        });
    } else {
        next();
    }
};

module.exports = checkAuth;
