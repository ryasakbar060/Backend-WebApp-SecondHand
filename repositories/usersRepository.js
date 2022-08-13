const { users, products } = require("../models");

class UsersRepository {
    static async getAllUsers() {
        const getUser = await users.findAll();

        return getUser;
    }

    static async getByEmail({ email }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    }

    static async getById({ id }) {
        const getUser = await users.findOne({
            where: {
                id
            }
        });

        return getUser;
    }

    static async create({
        name,
        email,
        password,
    }) {
        const createdUser = users.create({
            name,
            email,
            password,
        });

        return createdUser;
    }

    static async updateById({id, name, city, address, phoneNumber, picture }) {
        const updateById = await users.update({
            name,
            city,
            address,
            phoneNumber,
            picture,
        }, {
            where: {
                id
            }
        });

        return updateById;
    }


    static async getProductBySellerId({ id, isPublish, sold }) {
        const query = {
            where: {}
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        if (isPublish) {
            query.where = { ...query.where, isPublish }
        }

        const getProducts = await products.findAll(query);

        return getProducts;
    }
}


module.exports = UsersRepository;