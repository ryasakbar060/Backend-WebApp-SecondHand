const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const upload = require('./utils/fileUpload');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Controllers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const transactionsController = require('./controllers/transactionController');

// import middlewares
const middlewares = require('./middlewares/auth');

// Define Routes auth
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/auth/me', middlewares.authenticate, authController.currentUser);

// Define Routes Users
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getById);
app.put('/users/update/:id', middlewares.authenticate, upload.single('picture'), userController.updateById);

// Define Routes Products
app.get('/products', productController.getAll);
app.post('/products/create', middlewares.authenticate, upload.fields([{ name: 'picture' }]), productController.create);
app.get('/products/:id', middlewares.authenticate, productController.getProductById);
app.get('/users/:id/products?', userController.getProductBySellerId);
app.put('/products/:id', middlewares.authenticate, upload.fields([{ name: 'picture' }]), productController.updateProductById);
app.delete('/products/:id', middlewares.authenticate, productController.deleteProductById);
app.get('/api/filter?', productController.filterProducts);

// Transaction
app.get('/transactions/user/:id', middlewares.authenticate, transactionsController.getTransactionByUserId);
app.get('/transactions/seller/:id', middlewares.authenticate, transactionsController.getTransactionBySellerId);
app.post('/transactions', middlewares.authenticate, transactionsController.createTransaction);
app.put('/transactions/:id', middlewares.authenticate, transactionsController.updateTransaction);
app.get('/transactions', middlewares.authenticate, transactionsController.getAllTransaction);
app.get('/transactions/notif/:id', middlewares.authenticate, transactionsController.getTransactionNotif);
app.get('/transactions/:id', middlewares.authenticate, transactionsController.getTransactionById);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || 3000}`);
});
