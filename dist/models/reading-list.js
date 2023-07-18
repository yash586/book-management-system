"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const book_1 = __importDefault(require("./book"));
const status_1 = __importDefault(require("./status"));
class ReadingList extends sequelize_1.Model {
    progress_measure;
    id;
    book_isbn;
    status_id;
}
ReadingList.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    book_isbn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: book_1.default,
            key: "isbn",
        },
    },
    status_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    progress_measure: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
    },
}, {
    sequelize: database_1.default,
    modelName: "ReadingList",
    tableName: "reading_list",
});
ReadingList.belongsTo(book_1.default, { foreignKey: "book_isbn", targetKey: "isbn" });
ReadingList.belongsTo(status_1.default, { foreignKey: "status_id", targetKey: "id" });
exports.default = ReadingList;
