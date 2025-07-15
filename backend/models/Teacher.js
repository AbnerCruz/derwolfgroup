import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Teacher = sequelize.define("Teacher", {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    disciplines:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    instagram:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Teacher;