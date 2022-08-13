const usersService = require("../services/usersService");

const getAllUsers = async (req, res) => {
    const { status, status_code, message, data } = await usersService.getAllUsers();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getById = async (req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data } = await usersService.getById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const {name, city, address, phoneNumber, } = req.body;

    const {
        status,
        status_code,
        message,
        data
    } = await usersService.updateById({
        id,
        name,
        city,
        address,
        phoneNumber,
        picture: req.file,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};


const getProductBySellerId = async (req, res, next) => {
    const { id } = req.params;
    const { isPublish, sold } = req.query;

    const { status, status_code, message, data } =
    await usersService.getProductBySellerId({
        id,
        isPublish,
        sold,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { getAllUsers, getById, updateById, getProductBySellerId }