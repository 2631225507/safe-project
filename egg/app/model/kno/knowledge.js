'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Knowledge = app.model.define('Knowledge',
    Object.assign(base(app), {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    content: STRING(255),
    type: STRING(255),
    author: STRING(255)
  }));

  return Knowledge;
};
