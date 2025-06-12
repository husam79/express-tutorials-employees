export default async function validateToken(request, response, next){
    let token = request.headers['authorization']; //Bearer 128w4098092ufsodfiuof...
    token = token.split(' ')[1];

    const repository = request.employeesRepo;
    const employee = await repository.getByToken(token);

    if(!employee) {
        return response.sendStatus(401);
    }

    request.authUser = employee;

    next();
}