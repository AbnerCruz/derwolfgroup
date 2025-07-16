import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Teacher from "./Teacher.js";

const TeacherAvailability = sequelize.define("TeacherAvailability", {
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weekday: {
    type: DataTypes.INTEGER, // 0=Dom, 1=Seg, ... 6=Sab
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME, // "14:00:00"
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME, // "16:00:00"
    allowNull: false,
  },
});

export default TeacherAvailability;
