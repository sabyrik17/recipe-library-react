const mongoose = require("mongoose");

async function connectDatabase(databaseUri) {
  await mongoose.connect(databaseUri);
}

module.exports = connectDatabase;
