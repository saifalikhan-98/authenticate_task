// Define the response middleware function
export const responseMiddleware = (req, res, next) => {
    // Create a function to send responses in a consistent format
    const apiResponse = (data, statusCode = 200, message = 'Success') => {
        return res.status(statusCode).json({
            success: statusCode === 200,
            message: statusCode === 200 ? message : `Error: ${message}`,
            data: statusCode === 200 ? data : null,
            error: statusCode !== 200 ? message : null,
        });
    };
    console.log(apiResponse)
    // Attach the apiResponse function to the response object
    res.apiResponse = apiResponse;

    // Call the next middleware in the chain
    next();
};
