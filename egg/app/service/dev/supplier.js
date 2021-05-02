'use strict';

const Service = require('egg').Service;

class SupplierService extends Service {
  // 获取所有供应商
  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Dev.Supplier.findAndCountAll({
        where: {
          upt_act: { [Op.ne]: 'D' },
        },
        limit: parseInt(limit),
        offset: (page - 1) * limit
      });
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async createSupplier(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;
    try {
      return await ctx.model.Dev.Supplier.create(body);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateSupplier(body) {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
      return await ctx.model.Dev.Supplier.update(body, {
        where: {
          supplier_id: body.supplier_id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteSupplier({ id }) {
    const { ctx } = this;
    const body = {
      upt_act: 'D',
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    try {
      await ctx.model.Dev.Supplier.update(body, {
        where: { supplier_id:id },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = SupplierService;