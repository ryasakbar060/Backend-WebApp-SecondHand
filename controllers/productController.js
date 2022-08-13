const productsService = require("../services/productsService");

const create = async (req, res, next) => {
    const { name, price, category, description, isPublish, sold } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productsService.create({
        user_id,
        name,
        price,
        category,
        description,
        picture: req.files,
        isPublish,
        sold
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};


const getAll = async (req, res) => {
    const { status, status_code, message, data } = await productsService.getAll();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data } = await productsService.getProductById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category, description, isPublish, sold } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productsService.updateProductById({
        id,
        user_id,
        name,
        price,
        category,
        description,
        picture: req.files,
        isPublish,
        sold
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const deleteProductById = async (req, res) => {
    const { id } = req.params;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await productsService.deleteProductById({
        id,
        user_id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const filterProducts = async (req, res) => {
    const { name, isPublish, sold, category } = req.query;

    const { status, code_status, message, data } = await productsService.filterProducts({ name, isPublish, sold, category });

    res.status(code_status).send({
        status: status,
        message: message,
        data: data,
    });
}

module.exports = {
    create,
    getAll,
    getProductById,
    updateProductById,
    deleteProductById,
    filterProducts,
};