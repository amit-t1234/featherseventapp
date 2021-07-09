const { Service } = require('feathers-sequelize');

const service = {
    async find(params) {
        return [];
    },
    async get(id, params) {},
    async create(data, params) {
        // ! Creating Transaction
        const t = await sequelize.transaction();

        try {
            const { name, description } = req.body;
            const userId = req.user.id;

            const event = await Event.create({ name, description, userId}, { transaction: t });

            const linkUserEvent = await event.addUsers(userId, { transaction: t });

            // ! Transaction Commit
            await t.commit();
            return res.status(200).send(linkUserEvent);
        } catch (error) {
            console.log(error);

            // ! Transaction Rollback
            await t.rollback();
            return res.status(400).send({ message: error.message });
        }
    },
    async update(id, data, params) {},
    async patch(id, data, params) {},
    async remove(id, params) {},
    setup(app, path) {}
}

exports.Users = service;
