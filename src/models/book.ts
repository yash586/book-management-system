import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface BookAttributes {
  id: number,
  isbn: string,
  title: string;
  author: string;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public isbn!: string;
  public title!: string;
  public author!: string;
}

Book.init(
  {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    isbn: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);


export default Book;
