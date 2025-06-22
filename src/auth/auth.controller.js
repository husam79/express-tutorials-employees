import bcrypt from 'bcrypt';
import { response } from 'express';
import jwt from 'jsonwebtoken';

export async function login(request, response) {
    const repository = request.employeesRepo;

    const username = request.body.username;
    const password = request.body.password;

    const employeeDB = await repository.getByUsername(username);

    if(!employeeDB){
        return response.sendStatus(401);
    }

    const match = await bcrypt.compare(password, employeeDB.password);
    if(match){
        const accessToken = await jwt.sign({id: employeeDB.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'});
        const refereshToken = await jwt.sign({id: employeeDB.id}, process.env.JWT_REFERESH_SECRET, {expiresIn: '1d'});

        employeeDB.token = refereshToken;
        await repository.update(employeeDB.id, employeeDB);
        return response.json({accessToken, refereshToken});
    } else {
        return response.sendStatus(401);
    }
}

export async function refereshJWTToken(request, response) {
    let refereshToken = request.headers['authorization']; //Bearer 128w4098092ufsodfiuof...
    refereshToken = refereshToken.split(' ')[1];

    if(!refereshToken){
        return response.sendStatus(400);
    }

    const {id} = jwt.verify(refereshToken, process.env.JWT_REFERESH_SECRET);
    
    const repository = request.employeesRepo;
    const employee = await repository.getByToken(refereshToken);

    if(!employee) {
        return response.sendStatus(404);
    }

    if(employee.id !== id){
        return response.sendStatus(404);
    }
    

    const accessToken = await jwt.sign({id: employee.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'});

    return response.json({
        accessToken
    }); 
}

export async function logout(request, response) {
    const repository = request.employeesRepo;
    const employee = await repository.getById(request.authUser.id);

    employee.token = "";

    await repository.update(employee);

    return response.sendStatus(200);
}