"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./../lib/commands");
exports.deployApp = () => {
    return commands_1.spawn('yarn', ['sls:deploy']);
};
