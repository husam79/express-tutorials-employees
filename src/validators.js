export function validateWholeEmployee(employee){
    if(!employee.name){
        throw new Error("The name parameter is missing");
    }
    if(!employee.age){
        throw new Error("The age parameter is missing");
    }
    if(isNaN(Number(employee.age))){
        throw new Error("The age parameter should be a number");
    }
}

export function validatePartOfEmployee(employee){
    if(!employee.name && !employee.age){
      throw new Error("You have to send at least age or name");
    }
    if(employee.age){
        if(isNaN(Number(employee.age))){
            throw new Error("The age parameter should be a number");
        }
    }
}

export function validateAttendance(attendance){
    if(!attendance.operation){
        throw new Error("The operation parameter is missing");
    }
    if(!attendance.employeeId){
        throw new Error("The employeeId parameter is missing");
    }
    if(attendance.operation !== 'in' && attendance.operation !== 'out'){
        throw new Error("The operation parameter must be either: 'in' or 'out'");
    }
}