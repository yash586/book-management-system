import express from "express";
import bookController from "../controller/book.controller";

const router = express.Router();

router.get("/books", bookController.getBooks);

export default router;
