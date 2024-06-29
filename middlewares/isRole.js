export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Only admin users are allowed to perform this action' });
    }
};

export const isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'Teacher') {
        next();
    } else {
        return res.status(403).json({ message: 'Only teacher users are allowed to perform this action' });
    }
};