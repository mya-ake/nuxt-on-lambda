"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const commands_1 = require("./../lib/commands");
exports.buildApp = async (buildCommands) => {
    for (let i = 0; i < buildCommands.length; ++i) {
        const command = buildCommands[i];
        const parsedCommand = command.split(/\s/);
        const commandName = parsedCommand.shift();
        if (typeof commandName !== 'string' || commandName.length === 0) {
            consola_1.default.info(`Skip build command: \`${command}\`, index: ${i}`);
            continue;
        }
        await commands_1.spawn(commandName, parsedCommand);
    }
};
