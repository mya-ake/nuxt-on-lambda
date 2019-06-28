"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = __importDefault(require("cross-spawn"));
exports.spawn = (command, args = []) => {
    return new Promise((resolve, reject) => {
        const ps = cross_spawn_1.default(command, args, { stdio: 'inherit' });
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
