'use strict';

const Controller = require('egg').Controller;

class SupplierController extends Controller {
  async page() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);
    ctx.body = await ctx.service.dev.supplier.page(query);
  }

  async createSupplier() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.dev.supplier.createSupplier(body);
  }
  
  async updateSupplier() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.body = await ctx.service.dev.supplier.updateSupplier(body);
  }

  async deleteSupplier() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    ctx.body  = await ctx.service.dev.supplier.deleteSupplier(body);
  }
}

module.exports = SupplierController;
