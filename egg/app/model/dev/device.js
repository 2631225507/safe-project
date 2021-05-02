'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Device = app.model.define('device',
    Object.assign(base(app), {
      device_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      image_url: STRING(255),
      name: STRING(255),
      specifications: STRING(255),
      type: STRING(255),
      status: STRING(255),
      supplier_id: INTEGER(11),
      sys_user_id: INTEGER(11)
    }));

  Device.associate = function () {
    Device.belongsTo(app.model.Dev.Supplier, { foreignKey: 'supplier_id' })
    Device.belongsTo(app.model.Sys.User, { foreignKey: 'sys_user_id' })
  }

  return Device;
};
