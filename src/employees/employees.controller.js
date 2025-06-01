import { 
    validateWholeEmployee, 
    validatePartOfEmployee 
} from '../validators.js';
import bcrypt from 'bcrypt';

export async function getAllEmployees(request, response) {
    response.json(await request.employeesRepo.getAll());
}

export async function getEmployee(request, response) {
    const id = request.params.id;

    const employee = await request.employeesRepo.getById(id);

    if(!employee){
        response.sendStatus(404);
    } else {
        response.json(employee);
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
    try{
        const id = request.params.id;

        await request.employeesRepo.delete(id);
        
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

        await request.employeesRepo.patch(id, employee);

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
}