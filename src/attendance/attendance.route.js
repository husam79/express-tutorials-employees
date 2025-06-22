import express from 'express';
import { addAttendace, getAllAttendances, getAllAttendancesOfEmployee } from './attendance.controller.js';
import {validateAttendance} from '../validators.js';
import wrapper from '../shared/wrapper.js';
import NotAuthorizedError from '../shared/errors/not-authorized-error.js';

const router = express.Router();

const extractAttendanceData = (request, response, next) => {
    try{
        const attendance = request.body;
        //validate data sent from the user.
        validateAttendance(attendance);
        request.attendance = attendance;
        next();
    } catch(error){
        next(error);
    }
};

const authorizeAdminRole = (request, response, next) => {
    if(request.authUser.role !== 'admin') {
        next(new NotAuthorizedError("You don't have a permission to access to this resource"))
    }

    next();
}

const authorizeSameIdentityOrAdmin = (request, response, next) => {
    if(
        request.authUser._id.toString() !== request.params.employeeId &&
        request.authUser.role !== 'admin'
    ){
        next(new NotAuthorizedError("You don't have a permission to access to this resource"))
    }

    next();
}

const authorizeSameIdentity = (request, response, next) => {
    if(request.authUser._id.toString() !== request.params.employeeId){
        next(new NotAuthorizedError("You don't have a permission to access to this resource"))
    }

    next();
}

router.post('/attendance', extractAttendanceData, authorizeSameIdentity, wrapper(addAttendace));
router.get('/attendance', authorizeAdminRole, wrapper(getAllAttendances));
router.get('/attendance/:employeeId', authorizeSameIdentityOrAdmin, wrapper(getAllAttendancesOfEmployee));

export default router;