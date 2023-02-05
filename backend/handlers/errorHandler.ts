class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    badRequest(message: string) {
        return new ApiError(400, message);
    }

    unathorized(message: string) {
        return new ApiError(401, message);
    }

    forbidden(message: string) {
        return new ApiError(403, message);
    }

    notFound(message: string) {
        return new ApiError(404, message);
    }

    internal(message: string) {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;
