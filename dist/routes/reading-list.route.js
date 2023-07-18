"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reading_list_controller_1 = __importDefault(require("../controller/reading-list.controller"));
const router = express_1.default.Router();
router.post("/reading-list", reading_list_controller_1.default.addToReadingList);
router.delete("/reading-list", reading_list_controller_1.default.deleteFromReadingList);
router.patch("/reading-list", reading_list_controller_1.default.updateReadingList);
router.get("/reading-list", reading_list_controller_1.default.getReadingList);
exports.default = router;
