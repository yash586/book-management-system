import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('vuppljtt32n6rcfj', 'qi58mmfgd7rykedg', 'hxsudzdtrtiesi0v', {
  host: 'spryrr1myu6oalwl.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  dialect: 'mysql',
  define: {
        timestamps: false
    }
});

export default sequelize;
