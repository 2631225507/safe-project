'use strict';

const Service = require('egg').Service;

class DeviceService extends Service {
    // 查询所有设备
    async page(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.name) {
            where.name = { [Op.like]: `%${query.name}%` }
        }
        try {
            return await ctx.model.Dev.Device.findAndCountAll({
                distinct: true, // 不加distinct，count和实际不符
                include: [ctx.model.Dev.Supplier, ctx.model.Sys.User],
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit
            });
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 修改设备状态
    async updateStatus(sys_user_id, status) {
        const { ctx } = this;
            try {
                const device = await ctx.model.Dev.Device.findOne({
                    where: { sys_user_id }
                });
                if (!device) {
                    ctx.status = 404;
                    return;
                }
                return await device.update({status})
            } catch (error) {
                console.log(error);
                return false
            }
    }
}

module.exports = DeviceService;