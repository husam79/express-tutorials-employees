import { 
    validateWholeEmployee, 
    validatePartOfEmployee 
} from '../validators.js';

import MonogEmployeeRepository from './employees.repository.js';

export async function getAllEmployees(request, response) {
    const repository = new MonogEmployeeRepository();
    response.json(await repository.getAll());
}

export async function getEmployee(request, response) {
    const id = request.params.id;

    const repository = new MonogEmployeeRepository();
    const employee = await repository.getById(id);

    if(!employee){
        response.sendStatus(404);
    } else {
        response.json(employee);
    }
}

export async function addEmployee(request, response) {
    const repository = new MonogEmployeeRepository();
    await repository.add(request.employee);

    response.sendStatus(200);
}

export async function updateEmployee(request, response) {
    const id = request.params.id;
    const repository = new MonogEmployeeRepository();
    await repository.update(id, employee);

    response.sendStatus(200);
}

export async function deleteEmployee(request, response) {
    try{
        const id = request.params.id;

        const repository = new MonogEmployeeRepository();
        await repository.delete(id);
        
        response.sendStatus(200);
    } catch(error){
        response.status(404).json({success: false, error: error.message});
    }
}

export async function patchEmployee(request, response) {
    try{
        const id = request.params.id;
        const employee = request.body;
        
        validatePartOfEmployee(employee);

        const repository = new MonogEmployeeRepository();
        await repository.patch(id, employee);

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
}