'use strict';
const base = require('../base');

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Order = app.model.define('order',
        Object.assign(base(app), {
            order_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            applicant: STRING,
            type: STRING,
            approval_sta: STRING
        }));

    Order.associate = function () {
        Order.hasMany(app.model.Order.Detail, { foreignKey: 'order_id' })
        // User.hasMany(app.model.Article, { foreignKey: '_id' })
    }

    return Order;
};