import MonogEmployeeRepository from "../employees/employees.repository.js";
import MongoAttendanceRepository from "../attendance/attendance.repository.js"

export default function SettingRepositoriesMiddleware(request, response, next){
    request.employeesRepo = new MonogEmployeeRepository();
    request.attendanceRepo = new MongoAttendanceRepository();

    next();
}