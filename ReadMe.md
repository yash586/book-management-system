## Project Name: Book Reading List Service

This is a Node.js application built using the Express framework, MySQL with Sequelize as the ORM, and TypeScript as the programming language. The service allows you to manage a reading list of books, where each book has attributes such as ISBN, Title, and Author, and can have a status of Unread, In Progress, or Finished.

# Table of Contents

# Features

# Installation

# Usage

# API Endpoints

# Database Schema

# Test

# Heroku

## Features

The Book Reading List Service provides the following features:

Single Tenant Service: This service is designed for a single user/account and does not support multiple users/accounts.

Add Books: You can add books to your reading list by providing the book's ISBN and optional status_id

Delete Books: Books can be removed from your reading list by specifying the book's identifier (ISBN).

Update Books: You can update the details of a book in your reading list, including the book's status (Unread, In Progress, or Finished).

Retrieve Reading List: You can view your reading list, which includes all the books you have added along with their details.

## Installation

To run the Book Reading List Service on your local machine, follow these steps:

Step I :-

git clone https://github.com/yash586/book-management-system.git

Step II :-

cd book-reading-list-service

Step III :-

npm install

Step IV :-

npm start

## Usage

Once the service is up and running, you can interact with it using the provided API endpoints. You can make requests to these endpoints using tools like cURL or an API testing tool such as Postman.

## API Endpoints

The following API endpoints are available:

GET /books: Retrieves all the books available.
GET /reading-list: Retrieves all books in the reading list.
POST /reading-list: Adds a new book to the reading list.
PATCH /reading-list: Updates the details of a specific book.
DELETE /reading-list: Deletes a specific book from the reading list.

## Database Schema

The database schema used by the Book Reading List Service consists of the following table:

Books: Stores information about the books including the attributes ISBN, Title, Author

Reading-List: Stores information about the reading list including book_isbn, status_id, progress_measure.

Status: Stores information about the progress of book such as Finished, In Progress, Unread.

## Testing

To run the tests, execute the following command:

1. npm run test for running the every single test case.

2. npm run test fileName for running a particular file.

## Heroku

https://book20-21120c6b1d89.herokuapp.com/books
