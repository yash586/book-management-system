import express, { Request, Response } from "express";
import sequelize from "./config/database";
import booksRoute from "./routes/book.route";
import readingList from "./routes/reading-list.route";
const app = express();
const port = process.env.PORT || 3000;

// Add middleware for JSON parsing
app.use(express.json());

// Define routes
app.use(booksRoute);
app.use(readingList);
// Test the database connection
sequelize
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
