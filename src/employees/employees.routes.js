import express from 'express';
import { addEmployee, deleteEmployee, getAllEmployees, getEmployee, patchEmployee, updateEmployee } from './employees.controller.js';

const router = express.Router();

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployee);
router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);
router.patch('/employees/:id', patchEmployee);

export default router;