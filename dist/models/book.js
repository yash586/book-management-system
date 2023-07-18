"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Book extends sequelize_1.Model {
    id;
    isbn;
    title;
    author;
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    isbn: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Book',
    tableName: 'books',
});
exports.default = Book;
