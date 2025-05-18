import express, { request, response } from 'express';
import {v4 as uuidv4} from 'uuid';
import { 
    validateWholeEmployee, 
    validatePartOfEmployee 
} from './validators.js';

const PORT = 3006;
const app = express();

app.use(express.json());

let employees = [];

function deleteEmployee(id){
    employees = employees.filter(e => e.id !== id);
}

app.get('/employees', (request, response) => {
    response.json(employees)
});

app.get('/employees/:id', (request, response) => {
    const id = request.params.id;
    const employee = employees.find(e => e.id === id);

    if(!employee){
        response.sendStatus(404);
    } else {
        response.json(employee)
    }
});

app.post('/employees', (request, response) => {
    try{
        const employee = request.body;
        employee.id = uuidv4();

        //validate data sent from the user.
        validateWholeEmployee(employee);

        employees.push(employee);

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
});

app.put('/employees/:id', (request, response) => {
    try{
        const id = request.params.id;

        const employee = employees.find(e => e.id === id);
        if(!employee){
            return response.sendStatus(404);
        }

        const employeeRequest = request.body;

        //validate data sent from the user.
        validateWholeEmployee(employeeRequest);

        employee.name = employeeRequest.name;
        employee.age = employeeRequest.age;

        response.sendStatus(200);
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
});

app.delete('/employees/:id', (request, response) => {
    const id = request.params.id;

    const employee = employees.find(e => e.id === id);
    if(!employee){
        return response.sendStatus(404);
    }

    deleteEmployee(id);

    response.sendStatus(200);
});

app.patch('/employees/:id', (request, response) => {
    const id = request.params.id;

    let employee = employees.find(e => e.id === id);
    if(!employee){
        return response.sendStatus(404);
    }

    const employeeRequest = request.body;
    
    const validateResult = validatePartOfEmployee(employeeRequest);
    if(!validateResult){
        return response.sendStatus(400);
    }

    employee = {...employee, ...employeeRequest};

    deleteEmployee(id);
    employees.push(employee);

    response.sendStatus(200);
});





app.listen(PORT, () => console.log(`I am listening on port: ${PORT}`));

// HTTP Requests
//     - GET
//     - POST
//     - PUT
//     - PATCH
//     - DELETE

// RESTFUL API Calls