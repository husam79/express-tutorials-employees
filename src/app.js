import express from 'express';
import employeesRouter from './employees/employees.routes.js';
import attendaceRouter from './attendance/attendance.route.js';
import authRouter from './auth/auth.routes.js';
import mongoose from 'mongoose';
import SettingRepositoriesMiddleware from './middlewares/setting-repositories-middleware.js';

mongoose.connect('mongodb://127.0.0.1:27017/employees_db');

const PORT = 3006;
const app = express();

app.use(express.json());
app.use(SettingRepositoriesMiddleware);
app.use('/', employeesRouter);
app.use('/', attendaceRouter);
app.use('/', authRouter);

app.listen(PORT, () => console.log(`I am listening on port: ${PORT}`));


//REQUEST (flutter app) => express.json => extractEmployeeData => SERVER (Routes -> Controller -> Respository) => RESPONSE (data)