import express from "express";
import readingListController from "../controller/reading-list.controller";
const router = express.Router();

router.post("/reading-list", readingListController.addToReadingList);
router.delete("/reading-list", readingListController.deleteFromReadingList);
router.patch("/reading-list", readingListController.updateReadingList);
router.get("/reading-list", readingListController.getReadingList);

export default router;
