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
    const users = await this.app.mysql.select('admin_info');
    return users;
  }

  async add(params) {
    const data = {
      id: UUID.v1(),
      ...params,
      create_time: this.app.mysql.literals.now,
      is_frozen: 0
    };
    const res = await this.app.mysql.insert('admin_info', data);
    return res;
  }

  async updateUser(params) {
    params.create_time = new Date(params.create_time);
    const res = await this.app.mysql.update('admin_info', params);
    return res;
  }

  async qureyOneUser(params) {
    const res = await this.app.mysql.get('admin_info', params);
    return res;
  }

  async delete(params) {
    const res = await this.app.mysql.delete('admin_info', params);
    return res;
  }

  async findByName(params) {
    const user = await this.app.mysql.get('admin_info', params);
    return user;
  }

  async findByPhone(params) {
    const user = await this.app.mysql.get('admin_info', params);
    return user;
  }

  async resetPassword(params) {
    const newData = {
      ...params,
      user_pwd: '000000',
      update_time: this.app.mysql.literals.now
    }
    const res = await this.app.mysql.update('admin_info', params);
    return res;
  }

  async frozen(params) {
      const newData = {
      ...params,
      update_time: this.app.mysql.literals.now
    }
    const res = await this.app.mysql.update('admin_info', params);
    return res;
  }
}

module.exports = AdminService;