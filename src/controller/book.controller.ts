import { Request, Response } from "express";
import { BookService } from "../service/book.service";

class BooksController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public getBooks = async (_req: Request, res: Response) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
}

export default new BooksController();
