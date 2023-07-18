"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const reading_list_route_1 = __importDefault(require("./routes/reading-list.route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Add middleware for JSON parsing
app.use(express_1.default.json());
// Define routes
app.use(book_route_1.default);
app.use(reading_list_route_1.default);
// Test the database connection
database_1.default
    .authenticate()
    .then(() => {
    console.log("Database connected");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
