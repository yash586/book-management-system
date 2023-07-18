import { Request, Response, NextFunction } from "express";

export async function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const book_isbn = req.params.book_isbn;
  const status_id = req.params.status_id;

  if (!book_isbn || !status_id) {
    const error_message =
      "Missing required parameters: " +
      (!book_isbn ? "book_isbn " : "") +
      (!status_id ? "status_id " : "");

    // Return an error response directly from the middleware
    return res.status(400).json({ error: error_message });
  }

  // All parameters are present, proceed to the next middleware/route handler
  next();
}
