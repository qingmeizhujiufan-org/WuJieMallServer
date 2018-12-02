'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class AdminService extends Service {

  async login(params) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('admin_info', params);
    return user;
  }

  async queryList() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const Admin = await this.app.mysql.select('admin_info');
    return Admin;
  }

  async add(params) {
    const data = {
      id: UUID.v1(),
      real_name: params.realName,
      user_name: params.userName,
      user_pwd: params.password,
      role_id: params.roleId,
      create_time: this.app.mysql.literals.now,
      is_frozen: 0
    };
    const result = await this.app.mysql.insert('admin_info', data);
    console.log('result ===', result);

    return result;
  }
}

module.exports = AdminService;