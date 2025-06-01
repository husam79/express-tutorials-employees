import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
        const token = crypto.randomBytes(128).toString('hex');
        employeeDB.token = token;
        await repository.update(employeeDB.id, employeeDB);
        return response.json({token: token});
    } else {
        return response.sendStatus(401);
    }
}

export async function logout(request, response) {
    
}