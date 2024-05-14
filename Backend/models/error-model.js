class MingleError extends Error{
    errorMessage;
    statusCode;

    constructor(errorMessage, statusCode){
        super();
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }
}

module.exports = MingleError;