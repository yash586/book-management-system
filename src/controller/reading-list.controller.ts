import { Request, Response } from "express";
import { ReadingListService } from "../service/reading-list.service";

class ReadingListController {
  public readingListService: ReadingListService;

  constructor() {
    this.readingListService = new ReadingListService();
  }

  public getReadingList = async (_req: Request, res: Response) => {
    try {
      const readingList = await this.readingListService.getReadingList();
      res.json(readingList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve the reading list" });
    }
  };

  public addToReadingList = async (_req: Request, res: Response) => {
    try {
      const readingList = await this.readingListService.addToReadingList(
        _req.body
      );
      res.status(201).json(readingList);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Failed to add to the reading list" });
    }
  };

  public deleteFromReadingList = async (_req: Request, res: Response) => {
    try {
      const readingList = await this.readingListService.deleteFromReadingList(
        _req.body
      );
      if (readingList.message) {
        res.status(404).json(readingList); // 404 - Not Found
      } else {
        res.json(readingList);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to delete from the reading list" });
    }
  };

  public updateReadingList = async (_req: Request, res: Response) => {
    try {
      const readingList = await this.readingListService.updateReadingList(
        _req.body
      );
      res.json(readingList);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Failed to update the reading list" }); // 400 - Bad Request
    }
  };
}

export default new ReadingListController();
