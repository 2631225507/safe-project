'use strict';
// const md5 = require('md5');
const Service = require('egg').Service;

class DetailService extends Service {
    async getDetail(body) {
        const { ctx } = this;
        return await ctx.model.Order.Detail.findAll({
            // include: ctx.model.Order.Detail
            where: { order_id: body.id }
        });
    }
}

module.exports = DetailService;
