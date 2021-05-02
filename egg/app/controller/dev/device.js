'use strict';

const Controller = require('egg').Controller;

class DeviceController extends Controller {
  // 查询所有设备
  async page() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);
    ctx.body = await ctx.service.dev.device.page(query);
  }

  // 修改设备状态
  async updateStatus() {
    const { ctx } = this;
    const { sys_user_id, status } = ctx.request.body;
    ctx.body = await ctx.service.dev.device.updateStatus(sys_user_id, status);
  }
}

module.exports = DeviceController;
