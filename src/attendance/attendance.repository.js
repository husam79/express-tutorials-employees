import Attendance from "./attendance.model.js";

export default class MongoAttendanceRepository{
    async getAll(){
        let attendances = await Attendance.find();
        return attendances;
    }

    async getAllOfEmployee(employeeId){
        let attendances = await Attendance.find({
            employeeId: employeeId
        });
        return attendances;
    }

    async getById(id){
        let attendance = await Attendance.findById(id);
        return attendance;
    }

    // async delete(id){
    //     let attendance = await Attendance.findByIdAndDelete(id);
    //     if(!attendance){
    //         throw new Error("Attendance not found!")
    //     }
    // }

    async add(employee){
        const attendanceInstance = new Attendance(employee);
        await attendanceInstance.save();
    }

    // async update(id, attendanceRequest){
    //     let attendance = await Attendance.findByIdAndUpdate(
    //         id, attendanceRequest, {new: true}
    //     );
    //     if(!attendance){
    //         throw new Error("Attendance not found!")
    //     }
    // }

    // async patch(id, attendanceRequest){
    //     await this.update(id, attendanceRequest);
    // }
}

