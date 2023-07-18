import { Request, Response } from "express";
import ReadingListController from "./reading-list.controller";
import { ReadingListService } from "../service/reading-list.service";
import ReadingList from "../models/reading-list";

describe("ReadingListController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("getReadingList", () => {
    it("should return the reading list", async () => {
      const readingList: ReadingList[] = [
        { id: 1, book_isbn: "1", status_id: 1 } as ReadingList,
        { id: 2, book_isbn: "2", status_id: 1 } as ReadingList,
        { id: 3, book_isbn: "3", status_id: 1 } as ReadingList,
      ];

      const readingListServiceMock = jest
        .spyOn(ReadingListController.readingListService, "getReadingList")
        .mockResolvedValueOnce(readingList);

      await ReadingListController.getReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(readingListServiceMock).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(readingList);
    });

    it("should handle server error", async () => {
      const error = new Error("Internal Server Error");
      const readingListServiceMock = jest
        .spyOn(ReadingListController.readingListService, "getReadingList")
        .mockRejectedValueOnce(error);

      await ReadingListController.getReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

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
        .spyOn(ReadingListController.readingListService, "addToReadingList")
        .mockResolvedValueOnce({ message: "" });

      mockRequest.body = { book: "Book 3" };

      await ReadingListController.addToReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 3" });
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    it("should handle server error", async () => {
      const error = new Error("Internal Server Error");
      const readingListServiceMock = jest
        .spyOn(ReadingListController.readingListService, "addToReadingList")
        .mockRejectedValueOnce(error);

      mockRequest.body = { book: "Book 3" };

      await ReadingListController.addToReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 3" });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Server Error",
      });
    });
  });

  describe("deleteFromReadingList", () => {
    it("should delete a book from the reading list", async () => {
      const readingListServiceMock = jest.spyOn(
        ReadingListController.readingListService,
        "deleteFromReadingList"
      );

      mockRequest.body = { book: "Book 1" };

      await ReadingListController.deleteFromReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 1" });
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it("should handle server error", async () => {
      const error = new Error("Internal Server Error");
      const readingListServiceMock = jest
        .spyOn(
          ReadingListController.readingListService,
          "deleteFromReadingList"
        )
        .mockRejectedValueOnce(error);

      mockRequest.body = { book: "Book 1" };

      await ReadingListController.deleteFromReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(readingListServiceMock).toHaveBeenCalledWith({ book: "Book 1" });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Server Error",
      });
    });
  });

  describe("updateReadingList", () => {
    it("should update the reading list", async () => {
      const readingListServiceMock = jest.spyOn(
        ReadingListController.readingListService,
        "updateReadingList"
      );
      // .mockResolvedValueOnce();

      mockRequest.body = { book: "Book 1", newStatus: "Read" };

      await ReadingListController.updateReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(readingListServiceMock).toHaveBeenCalledWith({
        book: "Book 1",
        newStatus: "Read",
      });
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it("should handle server error", async () => {
      const error = new Error("Internal Server Error");
      const readingListServiceMock = jest
        .spyOn(ReadingListController.readingListService, "updateReadingList")
        .mockRejectedValueOnce(error);

      mockRequest.body = { book: "Book 1", newStatus: "Read" };

      await ReadingListController.updateReadingList(
        mockRequest as Request,
        mockResponse as Response
      );

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
