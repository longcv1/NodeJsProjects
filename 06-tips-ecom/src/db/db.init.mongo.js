const mongoose = require('mongoose');

const connectionString = `mongodb://localhost:27017/shopDev`;

class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if(1===1) {
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }
        mongoose.connect(connectionString);
    }

    static getInstance() {
        if(!Database._Instance) {
            this._Instance = new Database();
        }
        return this._Instance;
    }
}

const mongoDbConnection = Database.getInstance();

module.exports = mongoDbConnection;


