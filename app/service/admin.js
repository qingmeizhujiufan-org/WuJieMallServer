'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
    async queryList() {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const Admin = await this.app.mysql.select('admin_info');
        return Admin;
    }

    async add() {
        const result = await this.app.mysql.insert('admin_info', {
            user_name: '张三',
            user_pwd: '123456'
        });
        return result;
    }
}

module.exports = AdminService;