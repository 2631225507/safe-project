'use strict';
// const md5 = require('md5');
const Service = require('egg').Service;

class OrderService extends Service {
    async getOrder(limit, page) {
        const { ctx } = this;
        const offset = (page - 1) * limit
        return await ctx.model.Order.Order.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.Order.Detail,
            limit: parseInt(limit),
            offset,
        });
    }

    async createOrder(body) {
        const { ctx } = this;

        try {
            return await ctx.model.transaction(async t => {

                // 创建订单信息
                const createOrder = await ctx.model.Order.Order.create(body, { transaction: t });
                const OrderDetailArr = body.devices.map(item => {
                    return { order_id: createOrder.order_id, name: item.name, count: item.count, price: item.price, brand: item.brand };
                });
                // 创建订单详情信息
                const res = await ctx.model.Order.Detail.bulkCreate(OrderDetailArr, { transaction: t });

                return { success: res.length > 0 };
            });
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    async orderUpdate(body) {
        const { ctx } = this;
        const order_id = body.order_id
        // const applicant = body.applicant
        // const type = body.type
        const approval_sta = body.approval_sta
        const updated_at = new Date()
        try {
            await ctx.model.Order.Order.update(
                {
                    approval_sta,
                    updated_at
                },
                {
                    where: { order_id }
                })
            return { success: true }
        } catch (error) {
            return { success: false }
        }
    }
}

module.exports = OrderService;
