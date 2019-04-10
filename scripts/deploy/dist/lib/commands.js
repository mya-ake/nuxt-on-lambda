"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.spawn = (command, args = []) => {
    return new Promise((resolve, reject) => {
        const ps = child_process_1.spawn(command, args, { stdio: 'inherit' });
        ps.on('close', () => {
            resolve(ps);
        });
        ps.on('error', err => {
            reject(err);
        });
        ps.on('exit', code => {
            if (code === 0) {
                return;
            }
            reject(code);
        });
    });
};
