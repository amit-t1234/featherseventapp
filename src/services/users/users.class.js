const { Service } = require('feathers-sequelize');

const service = {
    async find(params) {
        return [];
    },
    async get(id, params) {},
    async create(data, params) {},
    async update(id, data, params) {},
    async patch(id, data, params) {},
    async remove(id, params) {},
    setup(app, path) {}
}

exports.Users = service;
