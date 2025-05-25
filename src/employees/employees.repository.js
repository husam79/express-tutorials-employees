import mongoose from "mongoose";

export default class MonogEmployeeRepository{
    static Employee;

    constructor(){
        if(!MonogEmployeeRepository.Employee){
            mongoose.connect('mongodb://127.0.0.1:27017/employees_db');

            const emplyeeSchema = new mongoose.Schema({name: String, age: Number});
            MonogEmployeeRepository.Employee = mongoose.model('Employee', emplyeeSchema);
        }
    }

    async getAll(){
        let employees = await MonogEmployeeRepository.Employee.find();
        return employees;
    }

    async getById(id){
        let employee = await MonogEmployeeRepository.Employee.findById(id);
        return employee;
    }

    async delete(id){
        let employee = await MonogEmployeeRepository.Employee.findByIdAndDelete(id);
        if(!employee){
            throw new Error("Employee not found!")
        }
    }

    async add(employee){
        const employeeInstance = new MonogEmployeeRepository.Employee(employee);
        await employeeInstance.save();
    }

    async update(id, employeeRequest){
        let employee = await MonogEmployeeRepository.Employee.findByIdAndUpdate(
            id, employeeRequest, {new: true}
        );
        if(!employee){
            throw new Error("Employee not found!")
        }
    }

    async patch(id, employeeRequest){
        await this.update(id, employeeRequest);
    }
}

