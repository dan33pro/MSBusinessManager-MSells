require('dotenv').config();

module.exports = {
    myBusinessManagerService: {
        host: process.env.MYBUSINESS_MANAGER_SERVICE_HOST || '',
        port: process.env.MYBUSINESS_MANAGER_SERVICE_PORT || '',
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || '',
        port: process.env.MYSQL_SERVICE_PORT || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || '',
    },
};