
/** 
 * @description Log the error and pass it to the next middleware
 * @param {Error} err 
 */
const LogError = (err, req, res, next) => {
    console.error(err.message);
    next(err);
}

/** 
 * @description Send the error message to the client
 * @param {Error} err
*/
const ErrorHandler = (err, req, res, next) => {
    if(err.isJoi) {
        res.status(400).json({
          message: err.message,
          stack: err.stack,
        });
        return;
    }
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
}

export { LogError, ErrorHandler };


