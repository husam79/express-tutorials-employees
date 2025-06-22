import jwt from 'jsonwebtoken';

export default async function validateToken(request, response, next){
    let accessToken = request.headers['authorization']; //Bearer 128w4098092ufsodfiuof...
    accessToken = accessToken.split(' ')[1];

    if(!accessToken){
        return response.sendStatus(400);
    }

    const {id} = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    
    if(!id){
        return response.sendStatus(401);
    }

    const repository = request.employeesRepo;
    const employee = await repository.getById(id);

    if(!employee) {
        return response.sendStatus(404);
    }

    request.authUser = employee;

    next();
}