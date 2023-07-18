import { BookService } from "./book.service";

// Create an instance of the BookService class
const bookService = new BookService();

describe("BookService", () => {
  describe("getAllBooks", () => {
    it("should fetch all books from the database", async () => {
      // Call the getAllBooks method
      const result = await bookService.getAllBooks();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
