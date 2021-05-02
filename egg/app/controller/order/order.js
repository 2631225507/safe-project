'use strict';

const await = require('await-stream-ready/lib/await');
const Controller = require('../base');

class OrderController extends Controller {
    async getOrder() {
        const { ctx } = this;
        const { limit, page } = ctx.request.body
        const data = await ctx.service.order.order.getOrder(limit, page);
        if (data) {
            ctx.body = data
        } else {
            ctx.body = { success: false }
        }
    }

    async createOrder() {
        const { ctx } = this;
        const body = ctx.request.body;

        ctx.validate({
            applicant: { type: 'string', required: true },
            type: { type: 'string', required: true },
            approval_sta: { type: 'string', required: true },
            devices: { type: 'array', required: true },
        }, body);

        const res = await ctx.service.order.order.createOrder(body);
        if (res.success) {
            this.success('添加成功');
        } else {
            this.error('添加失败 ' + (res.msg || ''));
        }
    }

    async orderUpdate() {
        const { ctx } = this;

        const body = ctx.request.body;
        console.log(body);

        const res = await ctx.service.order.order.orderUpdate(body)
        if (res.success) {
            ctx.body = { success: "审批成功" }
        } else {
            ctx.body = { success: "审批失败" }
        }
    }
}

module.exports = OrderController;
