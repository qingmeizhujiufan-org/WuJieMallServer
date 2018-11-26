'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async getUserList() {
      const userList = await this.app.mysql.select('user_info');
      this.ctx.body = userList;
  }
}

module.exports = HomeController;
