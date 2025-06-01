import { request, response } from "express";

export default function validateToken(request, response, next){
    //The sent token should be in the: authorization header!!!
    let token = request.headers['authorization']; //Bearer 128w4098092ufsodfiuof...
    token = token.split(' ')[1];
    // Retrieve the token that is saved with the employee, and be sure that they are same!
    // Hint: you will to add the function: getByToken to the employeesRepo.

}