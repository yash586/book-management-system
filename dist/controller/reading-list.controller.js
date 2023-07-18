"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reading_list_service_1 = require("../service/reading-list.service");
class ReadingListController {
    readingListService;
    constructor() {
        this.readingListService = new reading_list_service_1.ReadingListService();
    }
    getReadingList = async (_req, res) => {
        try {
            const readingList = await this.readingListService.getReadingList();
            res.json(readingList);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to retrieve the reading list" });
        }
    };
    addToReadingList = async (_req, res) => {
        try {
            const readingList = await this.readingListService.addToReadingList(_req.body);
            res.status(201).json(readingList);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: "Failed to add to the reading list" });
        }
    };
    deleteFromReadingList = async (_req, res) => {
        try {
            const readingList = await this.readingListService.deleteFromReadingList(_req.body);
            if (readingList.message) {
                res.status(404).json(readingList); // 404 - Not Found
            }
            else {
                res.json(readingList);
            }
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "Failed to delete from the reading list" });
        }
    };
    updateReadingList = async (_req, res) => {
        try {
            const readingList = await this.readingListService.updateReadingList(_req.body);
            res.json(readingList);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: "Failed to update the reading list" }); // 400 - Bad Request
        }
    };
}
exports.default = new ReadingListController();
