import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployees, getEmployee, patchEmployee, updateEmployee } from './employees.controller.js';
import { validateWholeEmployee } from '../validators.js';
import wrapper from '../shared/wrapper.js';

const router = express.Router();

const extractWholeEmployeeData = (request, response, next) => {
    try{
        const employee = request.body;
        //validate data sent from the user.
        validateWholeEmployee(employee);
        request.employee = employee;
        next();
    } catch(error){
        next(error);
    }
};

router.use((request, response, next) => {
    if(request.authUser.role !== 'admin'){
        return next(
            new NotAuthorizedError("You don't have a permission to access to this resource")
        );
    }

    next();
});

router.get('/employees', wrapper(getAllEmployees));
router.get('/employees/:id', wrapper(getEmployee));
router.post('/employees', extractWholeEmployeeData, wrapper(addEmployee));
router.put('/employees/:id', extractWholeEmployeeData, wrapper(updateEmployee));
router.delete('/employees/:id', wrapper(deleteEmployee));
router.patch('/employees/:id', wrapper(patchEmployee));


export default router;