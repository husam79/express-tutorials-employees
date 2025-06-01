import mongoose from "mongoose";

const emplyeeSchema = new mongoose.Schema({name: String, age: Number});
const Employee = mongoose.model('Employee', emplyeeSchema);

export default Employee;