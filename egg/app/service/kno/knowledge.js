'use strict';

const Service = require('egg').Service;

class KnowledgeService extends Service {
    // 获取安全知识
    async page(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        try {
            return await ctx.model.Kno.Knowledge.findAndCountAll({
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                where: {
                    upt_act: { [Op.ne]: 'D' },
                },
            });
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 查找安全知识内容详情
    async getKnowledge(id) {
        const { ctx } = this;
        try {
            return await ctx.model.Kno.Knowledge.findOne({
                where: { id }
            })
        } catch (error) {
            return false
        }
    }

    // 增加安全知识
    async createKnowledge(body) {
        const { ctx } = this;
        const { userid } = ctx.state.user;
        body.created_id = userid;
        body.updated_id = userid;
        try {
            return await ctx.model.Kno.Knowledge.create(body)
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 删除安全知识
    async deleteKnowledge({ id }) {
        const { ctx } = this;
        const body = {
            upt_act: 'D',
            updated_at: ctx.helper.formatTime(new Date()),
            updated_id: ctx.state.user.userid,
        };
        try {
            await ctx.model.Kno.Knowledge.update(body, {
                where: { id }
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}

module.exports = KnowledgeService;