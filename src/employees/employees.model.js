import mongoose from "mongoose";

// => username & password
// Server: OK, authenticated => token
// token

const emplyeeSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        name: String,
        age: Number,
        password: String,
        token: String,
        role: {type: String, enum: ['admin', 'normal'], default: 'normal'}
    }
);
const Employee = mongoose.model('Employee', emplyeeSchema);

export default Employee;