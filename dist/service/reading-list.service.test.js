"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reading_list_service_1 = require("./reading-list.service");
const reading_list_1 = __importDefault(require("../models/reading-list"));
jest.mock("../models/reading-list", () => {
    return {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn(),
    };
});
const mockStatusList = {
    findAll: jest.fn(),
};
jest.mock("../models/status", () => {
    return jest.fn().mockImplementation(() => mockStatusList);
});
describe("ReadingListService Integration Tests", () => {
    let readingListService;
    beforeEach(() => {
        readingListService = new reading_list_service_1.ReadingListService();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe("getReadingList", () => {
        it("should fetch the reading list with associated statuses", async () => {
            // Mock the findAll method of ReadingList model
            reading_list_1.default.findAll = jest.fn().mockResolvedValue([
                {
                    id: 1,
                    book_isbn: "1234567890",
                    status_id: 1,
                    status: {
                        id: 1,
                        name: "In Progress",
                    },
                },
            ]);
            const readingList = await readingListService.getReadingList();
            expect(reading_list_1.default.findAll).toHaveBeenCalled();
            expect(readingList).toEqual([
                {
                    id: 1,
                    // Include other properties as expected
                    book_isbn: "1234567890",
                    status_id: 1,
                    status: {
                        id: 1,
                        name: "In Progress",
                        // Include status properties
                    },
                },
                // Include more expected reading list items as needed
            ]);
        });
        it("should throw an error when there is a server error", async () => {
            // Mock the findAll method to throw an error
            reading_list_1.default.findAll = jest
                .fn()
                .mockRejectedValue(new Error("Server Error"));
            await expect(readingListService.getReadingList()).rejects.toThrow("Server Error");
            expect(reading_list_1.default.findAll).toHaveBeenCalled();
        });
    });
    describe("addToReadingList", () => {
        it("should add a book to the reading list", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890",
                status_id: 1, // Include the status ID
                // Include other required properties for adding a book to the reading list
            };
            // Mock the create method of ReadingList model
            reading_list_1.default.create = jest.fn().mockResolvedValue(readingListReqObject);
            const readingList = await readingListService.addToReadingList(readingListReqObject);
            expect(reading_list_1.default.create).toHaveBeenCalledWith(readingListReqObject);
            expect(readingList).toEqual(readingListReqObject);
        });
        it("should throw an error when there is a server error", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890",
                status_id: 1, // Include the status ID
                // Include other required properties for adding a book to the reading list
            };
            // Mock the create method to throw an error
            reading_list_1.default.create = jest
                .fn()
                .mockRejectedValue(new Error("Server Error"));
            await expect(readingListService.addToReadingList(readingListReqObject)).rejects.toThrow("Server Error");
            expect(reading_list_1.default.create).toHaveBeenCalledWith(readingListReqObject);
        });
    });
    describe("deleteFromReadingList", () => {
        it("should delete a book from the reading list", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890", // Include the book ISBN to be deleted
            };
            // Mock the destroy method of ReadingList model
            reading_list_1.default.destroy = jest.fn().mockResolvedValue(1); // Indicate that 1 row was deleted
            const response = await readingListService.deleteFromReadingList(readingListReqObject);
            expect(reading_list_1.default.destroy).toHaveBeenCalledWith({
                where: { book_isbn: readingListReqObject.book_isbn },
            });
            expect(response).toEqual({
                message: "Successfully deleted from the reading list.",
            });
        });
        it("should return a message when there is no available data to delete", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890", // Include the book ISBN to be deleted
            };
            // Mock the destroy method to indicate no rows were deleted
            reading_list_1.default.destroy = jest.fn().mockResolvedValue(0);
            const response = await readingListService.deleteFromReadingList(readingListReqObject);
            expect(reading_list_1.default.destroy).toHaveBeenCalledWith({
                where: { book_isbn: readingListReqObject.book_isbn },
            });
            expect(response).toEqual({
                message: "There is no available data in the reading list.",
            });
        });
        it("should throw an error when there is a server error", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890", // Include the book ISBN to be deleted
            };
            // Mock the destroy method to throw an error
            reading_list_1.default.destroy = jest
                .fn()
                .mockRejectedValue(new Error("Server Error"));
            await expect(readingListService.deleteFromReadingList(readingListReqObject)).rejects.toThrow("Server Error");
            expect(reading_list_1.default.destroy).toHaveBeenCalledWith({
                where: { book_isbn: readingListReqObject.book_isbn },
            });
        });
    });
    describe("updateReadingList", () => {
        it("should update the status of a book in the reading list", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890",
                status_id: 1, // Include the new status ID
                // Include other required properties for updating the reading list
            };
            // Mock the update method of ReadingList model
            reading_list_1.default.update = jest.fn().mockResolvedValue(1); // Indicate that 1 row was updated
            const response = await readingListService.updateReadingList(readingListReqObject);
            expect(reading_list_1.default.update).toHaveBeenCalledWith(readingListReqObject, {
                where: { book_isbn: readingListReqObject.book_isbn },
            });
            expect(response).toEqual({
                message: `Successfully the book is updated from ${readingListReqObject.status_id} to ${1}`,
            });
        });
        it("should throw an error when there is a server error", async () => {
            const readingListReqObject = {
                book_isbn: "1234567890",
                status_id: 1, // Include the new status ID
                // Include other required properties for updating the reading list
            };
            // Mock the update method to throw an error
            reading_list_1.default.update = jest
                .fn()
                .mockRejectedValue(new Error("Server Error"));
            await expect(readingListService.updateReadingList(readingListReqObject)).rejects.toThrow("Server Error");
            expect(reading_list_1.default.update).toHaveBeenCalledWith(readingListReqObject, {
                where: { book_isbn: readingListReqObject.book_isbn },
            });
        });
    });
});
