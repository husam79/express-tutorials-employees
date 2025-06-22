import ParameterIsInvalidError from "./shared/errors/parameter-is-invalid-error.js";
import ParameterIsMissingError from "./shared/errors/parameter-is-missing.js";

export function validateWholeEmployee(employee){
    if(!employee.username){
        throw new ParameterIsMissingError("The username parameter is missing")
    }
    if(!employee.password){
        throw new ParameterIsMissingError("The password parameter is missing")
    }
    if(!employee.name){
        throw new ParameterIsMissingError("The name parameter is missing");
    }
    if(!employee.age){
        throw new ParameterIsMissingError("The age parameter is missing");
    }
    if(isNaN(Number(employee.age))){
        throw new ParameterIsInvalidError("The age parameter should be a number");
    }
}

export function validatePartOfEmployee(employee){
    if(!employee.name && !employee.age){
      throw new ParameterIsMissingError("You have to send at least age or name");
    }
    if(employee.age){
        if(isNaN(Number(employee.age))){
            throw new ParameterIsInvalidError("The age parameter should be a number");
        }
    }
}

export function validateAttendance(attendance){
    if(!attendance.operation){
        throw new ParameterIsMissingError("The operation parameter is missing");
    }
    if(!attendance.employeeId){
        throw new ParameterIsMissingError("The employeeId parameter is missing");
    }
    if(attendance.operation !== 'in' && attendance.operation !== 'out'){
        throw new ParameterIsInvalidError("The operation parameter must be either: 'in' or 'out'");
    }
}