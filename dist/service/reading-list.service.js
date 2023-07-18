"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListService = void 0;
const book_1 = __importDefault(require("../models/book"));
const reading_list_1 = __importDefault(require("../models/reading-list"));
const status_1 = __importDefault(require("../models/status"));
class ReadingListService {
    getReadingList = async () => {
        try {
            const readingList = await reading_list_1.default.findAll({
                include: [book_1.default, status_1.default],
            });
            return readingList;
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed to retrieve the reading list");
        }
    };
    addToReadingList = async (readingListReqObject) => {
        try {
            const readingList = await reading_list_1.default.create(readingListReqObject);
            const response = {
                message: "The book is been added to reading list",
            };
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed to add to the reading list");
        }
    };
    deleteFromReadingList = async (readingListReqObject) => {
        try {
            const readingList = await reading_list_1.default.destroy({
                where: { book_isbn: readingListReqObject.book_isbn },
            });
            if (readingList === 0) {
                // No rows were deleted, so the data was already deleted
                const response = {
                    message: "There is no available data in the reading list.",
                };
                return response;
            }
            const response = {
                message: "Successfully deleted from the reading list.",
            };
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed to delete from the reading list");
        }
    };
    updateReadingList = async (readingListReqObject) => {
        try {
            const { book_isbn, status_id, progress_measure } = readingListReqObject;
            if (progress_measure) {
                let updatedProgressMeasure = parseFloat(progress_measure);
                updatedProgressMeasure = Math.min(updatedProgressMeasure * 1.02, 100);
                readingListReqObject.progress_measure =
                    updatedProgressMeasure.toFixed(2);
            }
            const updatedReadingList = await reading_list_1.default.update(readingListReqObject, {
                where: { book_isbn },
            });
            const response = {
                message: `Successfully updated the book status from ${readingListReqObject.status_id} to ${updatedReadingList}`,
            };
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed to update the reading list");
        }
    };
}
exports.ReadingListService = ReadingListService;
