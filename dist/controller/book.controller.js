"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = require("../service/book.service");
class BooksController {
    bookService;
    constructor() {
        this.bookService = new book_service_1.BookService();
    }
    getBooks = async (_req, res) => {
        try {
            const books = await this.bookService.getAllBooks();
            res.json(books);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    };
}
exports.default = new BooksController();
