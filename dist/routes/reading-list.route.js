"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const reading_list_controller_1 = __importDefault(require("../controller/reading-list.controller"));
const router = express_1.default.Router();
const readingListCreateSchema = {
    book_isbn: {
        optional: false,
        isString: true,
    },
    status_id: {
        optional: true,
        isInt: true,
    },
};
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
        return;
    }
    return res.status(422).json(errors.array());
};
router.get("/reading-list", reading_list_controller_1.default.getReadingList);
router
    .route("/reading-list")
    .all((0, express_validator_1.checkSchema)(readingListCreateSchema), validateRequest)
    .post(reading_list_controller_1.default.addToReadingList)
    .delete(reading_list_controller_1.default.deleteFromReadingList)
    .patch(reading_list_controller_1.default.updateReadingList);
exports.default = router;
