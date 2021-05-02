'use strict';

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Detail = app.model.define('order_detail', {
        detail_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        order_id: INTEGER,
        name: STRING,
        count: INTEGER,
        price: INTEGER,
        brand: STRING
    }, {
        createdAt: false,
        updatedAt: false
    });

    Detail.associate = function () {
        Detail.belongsTo(app.model.Order.Order, { foreignKey: 'order_id' })
    }

    return Detail;
};