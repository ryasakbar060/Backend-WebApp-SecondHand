require('dotenv').config();

module.exports = {
  development: {
    username: 'kgjmzcecliyvuk',
    password: '1be4f0be1aacf3b834f7cd00d250304d45136d31c2ee126ff09afa2f51b82425',
    database: 'ddk0car7vh4ud3',
    host: 'ec2-3-225-110-188.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: 'postgres',
    password: 'Ferdi12345',
    database: 'db_secondhand',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'kgjmzcecliyvuk',
    password: '1be4f0be1aacf3b834f7cd00d250304d45136d31c2ee126ff09afa2f51b82425',
    database: 'ddk0car7vh4ud3',
    host: 'ec2-3-225-110-188.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
