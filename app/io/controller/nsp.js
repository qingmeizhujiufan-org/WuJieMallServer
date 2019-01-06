'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
    async exchange() {
        const {ctx, app} = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const client = socket.id;

        try {
            const {target, payload} = message;
            if (!target) return;
            const msg = ctx.helper.parseMsg('exchange', payload, {client, target});
            nsp.emit(target, msg);
        } catch (error) {
            app.logger.error(error);
        }
    }

    async addProductToAdmin() {
        const {ctx, app} = this;
        const nsp = app.io.of('/');

        try {
            nsp.emit('有新产品等待审核，请及时处理');
        } catch(error) {
            app.logger.error(error);
        }
    }
}

module.exports = NspController;
