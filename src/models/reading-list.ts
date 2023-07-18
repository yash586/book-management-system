import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Book from "./book";
import StatusList from "./status";

interface ReadingListAttributes {
  id: number;
  book_isbn: string;
  status_id: number;
  progress_measure: number;
}

class ReadingList
  extends Model<ReadingListAttributes>
  implements ReadingListAttributes
{
  public progress_measure!: number;
  public id!: number;
  public book_isbn!: string;
  public status_id!: number;
}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    book_isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: Book,
        key: "isbn",
      },
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    progress_measure: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "ReadingList",
    tableName: "reading_list",
  }
);

ReadingList.belongsTo(Book, { foreignKey: "book_isbn", targetKey: "isbn" });
ReadingList.belongsTo(StatusList, { foreignKey: "status_id", targetKey: "id" });

export default ReadingList;
