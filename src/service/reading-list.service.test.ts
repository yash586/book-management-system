import { ReadingListService } from "./reading-list.service";
import ReadingList from "../models/reading-list";
import StatusList from "../models/status";

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
  let readingListService: ReadingListService;

  beforeEach(() => {
    readingListService = new ReadingListService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getReadingList", () => {
    it("should fetch the reading list with associated statuses", async () => {
      // Mock the findAll method of ReadingList model
      ReadingList.findAll = jest.fn().mockResolvedValue([
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

      expect(ReadingList.findAll).toHaveBeenCalled();
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
      ReadingList.findAll = jest
        .fn()
        .mockRejectedValue(new Error("Server Error"));

      await expect(readingListService.getReadingList()).rejects.toThrow(
        "Server Error"
      );
      expect(ReadingList.findAll).toHaveBeenCalled();
    });
  });

  describe("addToReadingList", () => {
    it("should add a book to the reading list", async () => {
      const readingListReqObject = {
        book_isbn: "1234567890", // Include the book ISBN
        status_id: 1, // Include the status ID
        // Include other required properties for adding a book to the reading list
      };

      // Mock the create method of ReadingList model
      ReadingList.create = jest.fn().mockResolvedValue(readingListReqObject);

      const readingList = await readingListService.addToReadingList(
        readingListReqObject
      );

      expect(ReadingList.create).toHaveBeenCalledWith(readingListReqObject);
      expect(readingList).toEqual(readingListReqObject);
    });

    it("should throw an error when there is a server error", async () => {
      const readingListReqObject = {
        book_isbn: "1234567890", // Include the book ISBN
        status_id: 1, // Include the status ID
        // Include other required properties for adding a book to the reading list
      };

      // Mock the create method to throw an error
      ReadingList.create = jest
        .fn()
        .mockRejectedValue(new Error("Server Error"));

      await expect(
        readingListService.addToReadingList(readingListReqObject)
      ).rejects.toThrow("Server Error");
      expect(ReadingList.create).toHaveBeenCalledWith(readingListReqObject);
    });
  });

  describe("deleteFromReadingList", () => {
    it("should delete a book from the reading list", async () => {
      const readingListReqObject = {
        book_isbn: "1234567890", // Include the book ISBN to be deleted
      };

      // Mock the destroy method of ReadingList model
      ReadingList.destroy = jest.fn().mockResolvedValue(1); // Indicate that 1 row was deleted

      const response = await readingListService.deleteFromReadingList(
        readingListReqObject
      );

      expect(ReadingList.destroy).toHaveBeenCalledWith({
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
      ReadingList.destroy = jest.fn().mockResolvedValue(0);

      const response = await readingListService.deleteFromReadingList(
        readingListReqObject
      );

      expect(ReadingList.destroy).toHaveBeenCalledWith({
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
      ReadingList.destroy = jest
        .fn()
        .mockRejectedValue(new Error("Server Error"));

      await expect(
        readingListService.deleteFromReadingList(readingListReqObject)
      ).rejects.toThrow("Server Error");
      expect(ReadingList.destroy).toHaveBeenCalledWith({
        where: { book_isbn: readingListReqObject.book_isbn },
      });
    });
  });

  describe("updateReadingList", () => {
    it("should update the status of a book in the reading list", async () => {
      const readingListReqObject = {
        book_isbn: "1234567890", // Include the book ISBN to be updated
        status_id: 1, // Include the new status ID
        // Include other required properties for updating the reading list
      };

      // Mock the update method of ReadingList model
      ReadingList.update = jest.fn().mockResolvedValue(1); // Indicate that 1 row was updated

      const response = await readingListService.updateReadingList(
        readingListReqObject
      );

      expect(ReadingList.update).toHaveBeenCalledWith(readingListReqObject, {
        where: { book_isbn: readingListReqObject.book_isbn },
      });
      expect(response).toEqual({
        message: `Successfully the book is updated from ${
          readingListReqObject.status_id
        } to ${1}`,
      });
    });

    it("should throw an error when there is a server error", async () => {
      const readingListReqObject = {
        book_isbn: "1234567890", // Include the book ISBN to be updated
        status_id: 1, // Include the new status ID
        // Include other required properties for updating the reading list
      };

      // Mock the update method to throw an error
      ReadingList.update = jest
        .fn()
        .mockRejectedValue(new Error("Server Error"));

      await expect(
        readingListService.updateReadingList(readingListReqObject)
      ).rejects.toThrow("Server Error");
      expect(ReadingList.update).toHaveBeenCalledWith(readingListReqObject, {
        where: { book_isbn: readingListReqObject.book_isbn },
      });
    });
  });
});
