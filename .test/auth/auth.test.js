const authController = require("../../controllers/authController");
const models = require("../../models");

describe("Auth unit test", () => {

    describe('Successful Operation', () => {

        describe('handleRegister', () => {
            it('should be returning status code 201 and return the new created user', async () => {
                const mReq = { body: { name: "ladia", email: "ladia@gmail.com", password: "11111111" } };
                const mRes = { status: jest.fn().mockReturnThis(), message: jest.fn().mockReturnThis(), data: jest.fn().mockReturnThis() };
                await authController.handleRegister(mReq, mRes);

                expect(mRes.status).toBeCalledWith(201);
                models.Users.destroy({ where: { name: "ladia", email: "ladia@gmail.com" } });
            });
        });

        describe('handleLogin', () => {
            it('should be returning status code 201 and return the acess token', async () => {
                const mReq = { body: { email: "ladia@gmail.com", password: "11111111" } };
                const mRes = { status: jest.fn().mockReturnThis(), message: jest.fn().mockReturnThis(), data: jest.fn().mockReturnThis() };
                await authController.handleLogin(mReq, mRes);

                expect(mRes.status).toBeCalledWith(201);
            });
        });

    });
});