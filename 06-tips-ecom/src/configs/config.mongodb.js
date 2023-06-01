const dev = {
    db : {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'db-dev',
    }
}

const stg = {
    db : {
        host: process.env.STG_DB_HOST || 'localhost',
        port: process.env.STG_DB_PORT || 27017,
        name: process.env.STG_DB_NAME || 'dv-stg',
    }
}

const config = { dev, stg};
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];