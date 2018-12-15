'use strict';
module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DATE} = app.Sequelize;
    const Admin = app.model.define('Admin', {
        //管理员用户自增id
        id: {
             type: STRING(255),
            defaultValue: UUIDV1,
            primaryKey: true,
            field: 'id'
        },
        //真实姓名
        realName: {
            type: STRING(64),
            field: 'real_name'
        },
        //用户名
        userName: {
            type: STRING(255),
            field: 'user_name'
        },
        //用户密码
        password: {
            type: STRING(255),
            field: 'user_pwd'
        },
        //角色ID
        roleId: {
            type: STRING(255),
            field: 'role_id'
        },
        //是否冻结
        isFrozen: {
            type: INTEGER,
            field: 'is_frozen'
        },
        // //更新时间
        // updateTime: {
        //     type: DATE,
        //     field: 'updated_at'
        // },
        //更新人员
        updateBy: {
            type: STRING(255),
            field: 'update_by'
        },
        // //创建时间
        // createTime: {
        //     type: DATE,
        //     field: 'created_at'
        // },
        //创建人员
        createBy: {
            type: STRING(255),
            field: 'create_by'
        },
        //用户电话
        phone: {
            type: STRING(255),
            field: 'phone'
        },
        //头像id
        avatarSrc: {
            type: STRING(255),
            field: 'avatar_src'
        }
    }, {
        freezeTableName: true,
        tableName: 'admin_info',
        timestamps: true,
    });
    return Admin;
};