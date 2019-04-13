import consola from 'consola';
import { spawn } from './../lib/commands';

export const buildApp = async (buildCommands: string[]) => {
  for (let i = 0; i < buildCommands.length; ++i) {
    const command = buildCommands[i];
    const parsedCommand = command.split(/\s/);
    const commandName = parsedCommand.shift();
    if (typeof commandName !== 'string' || commandName.length === 0) {
      consola.info(`Skip build command: \`${command}\`, index: ${i}`);
      continue;
    }
    await spawn(commandName, parsedCommand);
  }
};
