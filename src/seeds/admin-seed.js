import MonogEmployeeRepository from "../employees/employees.repository.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import boxen from 'boxen';

async function adminSeed(params) {
    mongoose.connect('mongodb://127.0.0.1:27017/employees_db');

    const repo = new MonogEmployeeRepository();
    const rawPwd = crypto.randomBytes(8).toString('hex');
    const hashedPwd = await bcrypt.hash(rawPwd, 10);

    await repo.add({
        username: 'admin',
        name: 'Admin',
        password: hashedPwd,
        token: '',
        role: 'admin'
    });

    // console.log('='.repeat(50));
    // console.log('username:', 'admin');
    // console.log('password', rawPwd);
    // console.log('='.repeat(50));

    const message = `username: admin\npassword: ${rawPwd}`;
    const framed = boxen(message, {
        padding: 1,
        margin: 1,
        borderStyle: 'round', //single, double, round, ...
        borderColor: 'green'
    });

    console.log(framed);

    await mongoose.disconnect();
}

adminSeed();