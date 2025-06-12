import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployees, getEmployee, patchEmployee, updateEmployee } from './employees.controller.js';
import { validateWholeEmployee } from '../validators.js';

const router = express.Router();

const extractWholeEmployeeData = (request, response, next) => {
    try{
        const employee = request.body;
        //validate data sent from the user.
        validateWholeEmployee(employee);
        request.employee = employee;
        next();
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
};

router.use((request, response, next) => {
    if(request.authUser.role !== 'admin'){
        return response.sendStatus(403);
    }

    next();
});

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployee);
router.post('/employees', extractWholeEmployeeData, addEmployee);
router.put('/employees/:id', extractWholeEmployeeData, updateEmployee);
router.delete('/employees/:id', deleteEmployee);
router.patch('/employees/:id', patchEmployee);


export default router;