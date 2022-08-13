const usersRepository = require("../repositories/usersRepository");
const cloudinary = require("../utils/cloudinary");

class usersService {

    static async getAllUsers() {
        try {
            const getAllUsers = await usersRepository.getAllUsers();
            return {
                status: true,
                status_code: 200,
                message: "success get data",
                data: {
                    getdata: getAllUsers,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    data: null,
                },
            };
        }
    }


    static async getById({ id }) {
        try {
            const getById = await usersRepository.getById({
                id,
            });
            return {
                status: true,
                status_code: 200,
                message: "success get data",
                data: {
                    getdata: getById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    data: null,
                },
            };
        }
    }

    static async updateById({ id, name, city, address, phoneNumber, picture }) {
        const getUsersById = await usersRepository.getById({ id })


        if (getUsersById.id == id) {

            let pictures = "";

            if (picture) {
                const fileBase64 = picture.buffer.toString("base64");
                const file = `data:${picture.mimetype};base64,${fileBase64}`;
                const cloudinaryPicture = await cloudinary.uploader.upload(file);
                pictures = cloudinaryPicture.url;
            } else {
                pictures = getUsersById.picture;
            }


            const updatedUser = await usersRepository.updateById({
                id,
                name,
                city,
                address,
                phoneNumber,
                picture: pictures
            });

            return {
                status: true,
                status_code: 200,
                message: "User berhasil melengkapi info akun!",
                data: {
                    updated_user: updatedUser,
                },
            };
        } else {
            return {
                status: false,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    updated_user: null,
                },
            };
        }
    };

    static async getProductBySellerId({ id, isPublish, sold }) {
        try {
            const getProducts = await usersRepository.getProductBySellerId({
                id,
                isPublish,
                sold
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    products: getProducts,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    data: null,
                },
            };
        }
    }
}

module.exports = usersService