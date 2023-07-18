"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = require("./book.service");
// Create an instance of the BookService class
const bookService = new book_service_1.BookService();
describe("BookService", () => {
    describe("getAllBooks", () => {
        it("should fetch all books from the database", async () => {
            // Call the getAllBooks method
            const result = await bookService.getAllBooks();
            expect(Array.isArray(result)).toBe(true);
        });
    });
});
