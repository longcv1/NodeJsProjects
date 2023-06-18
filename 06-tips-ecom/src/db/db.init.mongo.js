/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");

const connectionString = `mongodb://${host}:${port}/${name}`;
console.log(connectionString);

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    // eslint-disable-next-line no-constant-condition
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectionString)
      .then(console.log("Connected to MongoDB successfully..."))
      .catch((err) => console.log("Connect error: ", err));
  }

  static getInstance() {
    if (!Database._Instance) {
      Database._Instance = new Database();
    }
    return Database._Instance;
  }
}

const mongoDbConnection = Database.getInstance();

module.exports = mongoDbConnection;
