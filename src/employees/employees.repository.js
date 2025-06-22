import NotFoundError from "../shared/errors/not-found-error.js";
import Employee from "./employees.model.js";

export default class MonogEmployeeRepository{
    async getAll(){
        let employees = await Employee.find();
        return employees;
    }

    async getById(id){
        let employee = await Employee.findById(id);
        return employee;
    }

    async getByUsername(username){
        let employee = await Employee.findOne({username: username});
        return employee;
    }

    async getByToken(token){
        let employee = await Employee.findOne({token: token});
        return employee;
    }

    async delete(id){
        let employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            throw new NotFoundError("Employee not found!")
        }
    }

    async add(employee){
        const employeeInstance = new Employee(employee);
        await employeeInstance.save();
    }

    async update(id, employeeRequest){
        let employee = await Employee.findByIdAndUpdate(
            id, employeeRequest, {new: true}
        );
        if(!employee){
            throw new NotFoundError("Employee not found!")
        }
    }

    async patch(id, employeeRequest){
        await this.update(id, employeeRequest);
    }
}

