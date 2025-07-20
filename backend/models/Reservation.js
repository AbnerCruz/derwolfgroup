import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Reservation = sequelize.define("Reservation", {
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contractorName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  contractorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discipline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weekIndex: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weekday: {
    type: DataTypes.INTEGER, // 0 = domingo, ... 6 = sábado
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  whatsappNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
});

export default Reservation;

