"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('vuppljtt32n6rcfj', 'qi58mmfgd7rykedg', 'hxsudzdtrtiesi0v', {
    host: 'spryrr1myu6oalwl.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
exports.default = sequelize;
