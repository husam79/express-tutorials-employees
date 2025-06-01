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
        token: {type: String, unique: true}
    }
);
const Employee = mongoose.model('Employee', emplyeeSchema);

export default Employee;