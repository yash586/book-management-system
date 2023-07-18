import Book from "../models/book";
import ReadingList from "../models/reading-list";
import StatusList from "../models/status";

export class ReadingListService {
  public getReadingList = async () => {
    try {
      const readingList = await ReadingList.findAll({
        include: [Book, StatusList],
      });
      return readingList;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve the reading list");
    }
  };

  public addToReadingList = async (readingListReqObject: any) => {
    try {
      await ReadingList.create(readingListReqObject);
      const response = {
        message: "The book is been added to reading list",
      };
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add to the reading list");
    }
  };

  public deleteFromReadingList = async (readingListReqObject: any) => {
    try {
      const readingList = await ReadingList.destroy({
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
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete from the reading list");
    }
  };

  public updateReadingList = async (readingListReqObject: any) => {
    try {
      const { book_isbn, status_id, progress_measure } = readingListReqObject;

      if (progress_measure) {
        let updatedProgressMeasure = parseFloat(progress_measure);
        updatedProgressMeasure = Math.min(updatedProgressMeasure * 1.02, 100);

        readingListReqObject.progress_measure =
          updatedProgressMeasure.toFixed(2);
      }

      const updatedReadingList = await ReadingList.update(
        readingListReqObject,
        {
          where: { book_isbn },
        }
      );

      const response = {
        message: `Successfully updated the book status from ${readingListReqObject.status_id} to ${updatedReadingList}`,
      };

      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update the reading list");
    }
  };
}
