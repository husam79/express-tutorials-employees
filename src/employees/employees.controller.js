import { 
    validateWholeEmployee, 
    validatePartOfEmployee 
} from '../validators.js';

import MemoryEmployeeRepository from '../MemoryEmployeeRepository.js';

export function getAllEmployees(request, response) {
    const repository = new MemoryEmployeeRepository();
    response.json(repository.getAll());
}

export function getEmployee(request, response) {
    const id = request.params.id;

    const repository = new MemoryEmployeeRepository();
    const employee = repository.getById(id);

    if(!employee){
        response.sendStatus(404);
    } else {
        response.json(employee);
    }
}

export function addEmployee(request, response) {
    try{
        const employee = request.body;
        console.log(employee)
        //validate data sent from the user.
        validateWholeEmployee(employee);

        const repository = new MemoryEmployeeRepository();
        repository.add(employee);

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
}

export function updateEmployee(request, response) {
    try{
        const id = request.params.id;
        const employee = request.body;

        //validate data sent from the user.
        validateWholeEmployee(employee);

        const repository = new MemoryEmployeeRepository();
        repository.update(id, employee);

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
}

export function deleteEmployee(request, response) {
    try{
        const id = request.params.id;

        const repository = new MemoryEmployeeRepository();
        repository.delete(id);
        
        response.sendStatus(200);
    } catch(error){
        response.status(404).json({success: false, error: error.message});
    }
}

export function patchEmployee(request, response) {
    try{
        const id = request.params.id;
        const employee = request.body;
        
        validatePartOfEmployee(employee);

        const repository = new MemoryEmployeeRepository();
        repository.patch(id, employee);

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
}