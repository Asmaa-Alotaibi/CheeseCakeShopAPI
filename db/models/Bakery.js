module.exports = (sequelize, DataTypes) => {
  const Bakery = sequelize.define("Bakery", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  const SequelizeSlugify = require("sequelize-slugify");
  return Bakery;
};
