const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError' && err.code == 'credentials_required') {
        // jwt authentication error
        res.status(401).json({message: "User is not authorized"})
    }
    if (err.name === 'ValidationError') {
        //  validation error
        res.status(401).json({message: err})
    }
    // default to 500 server error
    res.status(500).json(err);
}

export {
    errorHandler,
}
