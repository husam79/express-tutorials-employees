import {v4 as uuidv4} from 'uuid';

export default class MemoryEmployeeRepository{
    static employees = [
        {
            id: '1234',
            name: 'Ahmad',
            age: 25
        }
    ];

    filterOutEmployee(id){
        return MemoryEmployeeRepository.employees.filter(e => e.id !== id);
    }

    getAll(){
        return MemoryEmployeeRepository.employees;
    }

    getById(id){
        const employee = MemoryEmployeeRepository.employees.find(e => e.id === id);
        return employee;
    }

    delete(id){
        const employee = MemoryEmployeeRepository.employees.find(e => e.id === id);
        if(!employee){
            throw new Error("Employee not found!")
        }
        this.filterOutEmployee(id);
    }

    add(employee){
        employee.id = uuidv4();
        MemoryEmployeeRepository.employees.push(employee);
    }

    update(id, employeeRequest){
        const employee = MemoryEmployeeRepository.employees.find(e => e.id === id);
        if(!employee){
            throw new Error("Employee not found!")
        }
        
        employee.name = employeeRequest.name;
        employee.age = employeeRequest.age;
    }

    patch(id, employeeRequest){
        let employee = MemoryEmployeeRepository.employees.find(e => e.id === id);
        if(!employee){
            throw new Error("Employee not found!")
        }
        
        employee = {...employee, ...employeeRequest};

        this.filterOutEmployee(id);
        MemoryEmployeeRepository.employees.push(employee);
    }
}

