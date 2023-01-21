import Sequelize from "sequelize";

const sequelize = new Sequelize("notic-board-db", "user", "pass", {
    dialect:"sqlite",
    host: "./config/notic-board-db.sqlite",
})

export default sequelize