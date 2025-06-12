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

const authorizeAdminRole = (request, response, next) => {
    if(request.authUser.role !== 'admin') {
        return response.sendStatus(403);
    }

    next();
}

const authorizeSameIdentityOrAdmin = (request, response, next) => {
    if(
        request.authUser._id.toString() !== request.params.employeeId &&
        request.authUser.role !== 'admin'
    ){
        return response.sendStatus(403);
    }

    next();
}

const authorizeSameIdentity = (request, response, next) => {
    if(request.authUser._id.toString() !== request.params.employeeId){
        return response.sendStatus(403);
    }

    next();
}

router.post('/attendance', extractAttendanceData, authorizeSameIdentity, addAttendace);
router.get('/attendance', authorizeAdminRole, getAllAttendances);
router.get('/attendance/:employeeId', authorizeSameIdentityOrAdmin, getAllAttendancesOfEmployee);

export default router;