function isLoggedIn(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'Vous devez vous connecter' });
    }
}

export default isLoggedIn;
