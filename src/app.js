import express from 'express';
import employeesRouter from './employees/employees.routes.js';

const PORT = 3006;
const app = express();

app.use(express.json());
app.use('/', employeesRouter);


app.listen(PORT, () => console.log(`I am listening on port: ${PORT}`));
