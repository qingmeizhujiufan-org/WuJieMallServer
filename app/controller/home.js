'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }

    async login() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const user = await ctx.service.home.login(params);
        if(user){
            ctx.body = {
                success: true,
                backData: user
            };
        }else {
            ctx.body = {
                success: false,
                backMsg: "用户编码或密码不正确！"
            };
        }
    }

    async queryList() {
        const ctx = this.ctx;
        const adminList = await ctx.service.admin.queryList();
        ctx.body = adminList;
    }

    async add() {
        const ctx = this.ctx;
        const result = await ctx.service.admin.add();
        ctx.body = result;
    }
}

module.exports = HomeController;
