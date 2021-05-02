'use strict';

const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Supplier = app.model.define('supplier',
    Object.assign(base(app), {
    supplier_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    telphone: STRING(255),
    address: STRING(255),
    remarks: STRING(255),
  }));

  Supplier.associate = function () {
    Supplier.hasMany(app.model.Dev.Device, { foreignKey: 'supplier_id' })
  }

  return Supplier;
};
