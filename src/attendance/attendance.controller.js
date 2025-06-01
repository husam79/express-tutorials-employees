
export async function getAllAttendances(request, response){
    response.json(await request.attendanceRepo.getAll());
}

export async function getAllAttendancesOfEmployee(request, response) {
    const employeeId = request.params.employeeId;
    const attendances = await request.attendanceRepo.getAllOfEmployee(employeeId);
    response.json(attendances);
}

export async function addAttendace(request, response) {
    const attendance = request.attendance;
    await request.attendanceRepo.add(attendance);

    response.sendStatus(200);
}