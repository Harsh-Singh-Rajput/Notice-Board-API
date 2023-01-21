import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

class Notice extends Model {}

Notice.init(
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
    },

    likes: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "notice",
  }
);

export { Notice };
