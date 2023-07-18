"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reading_list_controller_1 = __importDefault(require("./reading-list.controller"));
describe("ReadingListController", () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });
    describe("getReadingList", () => {
        it("should return the reading list", async () => {
            const readingList = [
                { id: 1, book_isbn: "1", status_id: 1 },
                { id: 2, book_isbn: "2", status_id: 1 },
                { id: 3, book_isbn: "3", status_id: 1 },
            ];
            const readingListServiceMock = jest
                .spyOn(reading_list_controller_1.default.readingListService, "getReadingList")
                .mockResolvedValueOnce(readingList);
            await reading_list_controller_1.default.getReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(readingList);
        });
        it("should handle server error", async () => {
            const error = new Error("Internal Server Error");
            const readingListServiceMock = jest
                .spyOn(reading_list_controller_1.default.readingListService, "getReadingList")
                .mockRejectedValueOnce(error);
            await reading_list_controller_1.default.getReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Server Error",
            });
        });
    });
    describe("addToReadingList", () => {
        it("should add a book to the reading list", async () => {
            const readingListServiceMock = jest
                .spyOn(reading_list_controller_1.default.readingListService, "addToReadingList")
                .mockResolvedValueOnce({ message: "" });
            mockRequest.body = { book: "Book 3" };
            await reading_list_controller_1.default.addToReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 3" });
            expect(mockResponse.json).toHaveBeenCalledWith({});
        });
        it("should handle server error", async () => {
            const error = new Error("Internal Server Error");
            const readingListServiceMock = jest
                .spyOn(reading_list_controller_1.default.readingListService, "addToReadingList")
                .mockRejectedValueOnce(error);
            mockRequest.body = { book: "Book 3" };
            await reading_list_controller_1.default.addToReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 3" });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Server Error",
            });
        });
    });
    describe("deleteFromReadingList", () => {
        it("should delete a book from the reading list", async () => {
            const readingListServiceMock = jest.spyOn(reading_list_controller_1.default.readingListService, "deleteFromReadingList");
            mockRequest.body = { book: "Book 1" };
            await reading_list_controller_1.default.deleteFromReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 1" });
            expect(mockResponse.json).toHaveBeenCalled();
        });
        it("should handle server error", async () => {
            const error = new Error("Internal Server Error");
            const readingListServiceMock = jest
                .spyOn(reading_list_controller_1.default.readingListService, "deleteFromReadingList")
                .mockRejectedValueOnce(error);
            mockRequest.body = { book: "Book 1" };
            await reading_list_controller_1.default.deleteFromReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 1" });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Server Error",
            });
        });
    });
    describe("updateReadingList", () => {
        it("should update the reading list", async () => {
            const readingListServiceMock = jest.spyOn(reading_list_controller_1.default.readingListService, "updateReadingList");
            // .mockResolvedValueOnce();
            mockRequest.body = { book: "Book 1", newStatus: "Read" };
            await reading_list_controller_1.default.updateReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalledWith({
                book: "Book 1",
                newStatus: "Read",
            });
            expect(mockResponse.json).toHaveBeenCalled();
        });
        it("should handle server error", async () => {
            const error = new Error("Internal Server Error");
            const readingListServiceMock = jest
                .spyOn(reading_list_controller_1.default.readingListService, "updateReadingList")
                .mockRejectedValueOnce(error);
            mockRequest.body = { book: "Book 1", newStatus: "Read" };
            await reading_list_controller_1.default.updateReadingList(mockRequest, mockResponse);
            expect(readingListServiceMock).toHaveBeenCalledWith({
                book: "Book 1",
                newStatus: "Read",
            });
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Server Error",
            });
        });
    });
});
