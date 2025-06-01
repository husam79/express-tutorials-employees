import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        employeeId: String,
        operation: String, //in, out
        dateTime: {type: Date, default: Date.now}
    }
);
const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;