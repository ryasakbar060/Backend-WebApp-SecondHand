const authService = require("../services/authService");

const register = async (req, res) => {
    const { name, email, password, } = req.body;

    const { status, status_code, message, data } = await authService.register({
        name,
        email,
        password,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const { status, status_code, message, data } = await authService.login({
        email,
        password,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const currentUser = async (req, res) => {
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: "Get current user success.",
        data: {
            user: currentUser,
        },
    });
};

module.exports = { register, login, currentUser };