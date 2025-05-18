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
    let result = !!employee.name || !!employee.age;
    if(employee.age){
        result = result && !isNaN(Number(employee.age));
    }
    return result;
}