import express, { NextFunction, Response, Request } from "express";
import { Schema, checkSchema, validationResult } from "express-validator";
import readingListController from "../controller/reading-list.controller";
const router = express.Router();

const readingListCreateSchema: Schema = {
  book_isbn: {
    optional: false,
    isString: true,
  },
  status_id: {
    optional: true,
    isInt: true,
  },
  progress_measure: {
    optional: true,
    isInt: {
      options: {
        min: 0,
        max: 100,
      },
    },
  },
};

const validateRequest: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }
  return res.status(422).json(errors.array());
};

router.get("/reading-list", readingListController.getReadingList);
router
  .route("/reading-list")
  .all(checkSchema(readingListCreateSchema), validateRequest)
  .post(readingListController.addToReadingList)
  .delete(readingListController.deleteFromReadingList)
  .patch(readingListController.updateReadingList);

export default router;
