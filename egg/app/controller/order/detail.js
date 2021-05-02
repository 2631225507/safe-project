'use strict';

const Controller = require('../base');

class DetailController extends Controller {
    async getDetail() {
        const { ctx } = this;
        const body = ctx.request.body
        // console.log(order_id);
        ctx.validate({
            id: { type: 'string', required: true },
        }, body);
        const data = await ctx.service.order.detail.getDetail(body);
        if (data) {
            ctx.body = data
        } else {
            ctx.body = { success: false }
        }
    }
}

module.exports = DetailController;
