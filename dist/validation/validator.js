"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
async function validationMiddleware(req, res, next) {
    const book_isbn = req.params.book_isbn;
    const status_id = req.params.status_id;
    if (!book_isbn || !status_id) {
        const error_message = "Missing required parameters: " +
            (!book_isbn ? "book_isbn " : "") +
            (!status_id ? "status_id " : "");
        // Return an error response directly from the middleware
        return res.status(400).json({ error: error_message });
    }
    // All parameters are present, proceed to the next middleware/route handler
    next();
}
exports.validationMiddleware = validationMiddleware;
