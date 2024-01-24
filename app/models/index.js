const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model")(mongoose, mongoosePaginate);
db.role = require("./role.model");
db.kandidat = require('./kandidat.model')(mongoose, mongoosePaginate);
db.settings = require('./settings.models')
db.vote = require('./vote.model')(mongoose, mongoosePaginate);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;