import { 
    validateWholeEmployee, 
    validatePartOfEmployee 
} from '../validators.js';
import bcrypt from 'bcrypt';

export async function getAllEmployees(request, response) {
    const employees =  await request.employeesRepo.getAll();

    response.json(employees.map(e => ({
        id: e._id,
        username: e.username,
        name: e.name,
        age: e.age
    }) ));
}

export async function getEmployee(request, response) {
    const id = request.params.id;

    const employee = await request.employeesRepo.getById(id);

    if(!employee){
        response.sendStatus(404);
    } else {
        response.json({
            id: employee._id,
            username: employee.username,
            name: employee.name,
            age: employee.age
        });
    }
}

export async function addEmployee(request, response) {
    request.employee.password = await bcrypt.hash(request.employee.password, 10);
    await request.employeesRepo.add(request.employee);

    response.sendStatus(200);
}

export async function updateEmployee(request, response) {
    const id = request.params.id;
    await request.employeesRepo.update(id, employee);

    response.sendStatus(200);
}

export async function deleteEmployee(request, response) {
    const id = request.params.id;

    await request.employeesRepo.delete(id);
    
    response.sendStatus(200);
}

export async function patchEmployee(request, response) {
    const id = request.params.id;
    const employee = request.body;
    
    validatePartOfEmployee(employee);

    await request.employeesRepo.patch(id, employee);

    response.sendStatus(200);
}