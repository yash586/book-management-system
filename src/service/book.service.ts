import Book from "../models/book";

export class BookService {
  public getAllBooks = async () => {
    try {
      const books = await Book.findAll();
      return books;
    } catch (error) {
      console.error(error);
      throw new Error("Server Error");
    }
  };
}
