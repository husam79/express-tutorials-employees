import express from 'express';
import { addAttendace, getAllAttendances, getAllAttendancesOfEmployee } from './attendance.controller.js';
import {validateAttendance} from '../validators.js';

const router = express.Router();

const extractAttendanceData = (request, response, next) => {
    try{
        const attendance = request.body;
        //validate data sent from the user.
        validateAttendance(attendance);
        request.attendance = attendance;
        next();
    } catch(error){
        response.status(400).json({success: false, error: error.message});
    }
};

router.post('/attendance', extractAttendanceData,  addAttendace);
router.get('/attendance', getAllAttendances);
router.get('/attendance/:employeeId', getAllAttendancesOfEmployee);

export default router;