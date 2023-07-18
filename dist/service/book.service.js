"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_1 = __importDefault(require("../models/book"));
class BookService {
    getAllBooks = async () => {
        try {
            const books = await book_1.default.findAll();
            return books;
        }
        catch (error) {
            console.error(error);
            throw new Error("Server Error");
        }
    };
}
exports.BookService = BookService;
