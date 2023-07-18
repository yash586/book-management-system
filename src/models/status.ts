import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


interface StatusAttributes {
  id: number,
  name: string,
}

class StatusList extends Model<StatusAttributes> implements StatusAttributes {
  public id!: number;
  public name!: string;
}

StatusList.init(
  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'StatusList',
    tableName: 'status',
  }
);

export default StatusList;
