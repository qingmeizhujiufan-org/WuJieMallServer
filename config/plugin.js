'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.passport = {
    enable: true,
    package: 'egg-passport',
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};