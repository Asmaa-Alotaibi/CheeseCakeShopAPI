"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//one to manay relation
db.Bakery.hasMany(db.Item, {
  as: "items",
  foreignKey: { fieldName: "bakeryId", allowNull: false },
});

db.Item.belongsTo(db.Bakery, {
  as: "bakery",
  foreignKey: { fieldName: "bakeryId" },
});

// one-to-one relation

db.User.hasOne(db.Bakery, { as: "baker", foreignKey: "userId" });
db.Bakery.belongsTo(db.User, { as: "owner" });

// one-to-many relation
db.User.hasMany(db.Order, { as: "orders", foreignKey: "userId" });
db.Order.belongsTo(db.User, { as: "user" });

// many-to-many relation
db.Order.belongsToMany(db.Item, {
  through: db.OrderItem,
  foreignKey: "orderId",
});
db.Item.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "itemId",
});

module.exports = db;
