const studentMiddleware = (req, res, next) => {
    if(req.isAuthenticated() && req.user.type === 'student'){
        return next();
    }
    return res.redirect(process.env.CLIENT_URL);
};

const facultyMiddleware = (req, res, next) => {
    if(req.isAuthenticated() && req.user.type === 'faculty'){
        return next();
    }
    return res.redirect(process.env.CLIENT_URL);
};

module.exports = {studentMiddleware, facultyMiddleware};