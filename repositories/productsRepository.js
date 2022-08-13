const { products, users } = require("../models");
const { Op } = require("sequelize");
const usersRepository = require("./usersRepository")

class ProductsRepository {
    static async create({ user_id, name, price, category, description, picture, isPublish, sold }) {
        const createdProduct = products.create({
            user_id,
            name,
            price,
            category,
            description,
            picture,
            isPublish,
            sold
        });

        return createdProduct;
    }

    static async getAll() {
        const getAll = await products.findAll();

        return getAll;
    }

    static async getProductById({ id
    }) {
        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "name", "city", "picture"]
            }]
        }
        if(id){
            query.where = { ...query.where, id: id}
        }

        const getProduct = await products.findOne(query);

        return getProduct;
    }

    static async updateProductById({ id, name, price, category, description, picture, isPublish, sold }) {
        const updateProductById = await products.update({
            name,
            price,
            category,
            description,
            picture,
            isPublish,
            sold
        }, {
            where: {
                id
            }
        });

        return updateProductById;
    }

    static async deleteProductById({ id }) {
        const getProduct = products.destroy({
            where: {
                id
            }
        });

        return getProduct;
    }
    static async getAllProduct({
        name,
        isPublish,
        sold,
        category
    }) {

        const query = {
            where: {},
            like: {}
        }

        if (name) {
            const searchByName = await products.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + name + '%' } },
                    ]
                },
                limit: 10,
            });

            return searchByName;
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        if (category) {
            query.where = { ...query.where, category }
        }

        if (isPublish) {
            query.where = { ...query.where, isPublish }
        }

        const getAllProduct = await products.findAll(query);

        return getAllProduct;
    }

}




module.exports = ProductsRepository;