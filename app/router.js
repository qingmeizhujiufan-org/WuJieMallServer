'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/egg', controller.home.index);
  router.get('/egg/getUserList', controller.home.getUserList);
};
