const transactionsService = require("../services/transactionsService");

const createTransaction = async (req, res) => {
    const {
        seller_id,
        product_id,
        bargain_price,
        isRejected,
        isAccepted,
        isOpened
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        status_code,
        message,
        data
    } =
    await transactionsService.createTransaction({
        user_id,
        seller_id,
        product_id,
        bargain_price,
        isRejected,
        isAccepted,
        isOpened
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}


const updateTransaction = async (req, res) => {
    const {
        id
    } = req.params;
    const { seller_id, product_id, bargain_price, isRejected, isAccepted, isOpened, sold } = req.body;

    const user_id = req.user.id;

    const {
        status,
        status_code,
        message,
        data
    } =
        await transactionsService.updateTransaction({
            id,
            user_id,
            seller_id,
            product_id,
            bargain_price,
            isRejected,
            isAccepted,
            isOpened,
            sold
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
}

const getTransactionByUserId = async (req, res, next) => {
    const { id } = req.params;
    const { isRejected, isAccepted, isOpened } = req.query;

    const { status, status_code, message, data } = await transactionsService.getTransactionByUserId({
        id,
        isRejected,
        isAccepted,
        isOpened
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionBySellerId = async (req, res, next) => {
    const { id } = req.params;
    const { isRejected, isAccepted, isOpened } = req.query;

    const { status, status_code, message, data } = await transactionsService.getTransactionBySellerId({
        id,
        isRejected,
        isAccepted,
        isOpened
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getAllTransaction = async (req, res) => {
    const { status, status_code, message, data } = await transactionsService.getAllTransaction();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionNotif = async (req, res) => {
    const { id } = req.params;
    const { isAccepted, isRejected } = req.query;

    const {
        status,
        status_code,
        message,
        data
    } = await transactionsService.getTransactionNotif({
        id,
        isAccepted,
        isRejected
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionById = async (req, res) => {
    const { id } = req.params;
    const {
        isAccepted,
        isRejected
    } = req.query;

    const {
        status,
        status_code,
        message,
        data
    } = await transactionsService.getTransactionById({
        id,
        isAccepted,
        isRejected
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    createTransaction,
    updateTransaction,
    getTransactionByUserId,
    getTransactionBySellerId,
    getAllTransaction,
    getTransactionNotif,
    getTransactionById,
};