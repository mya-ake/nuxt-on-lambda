import { spawn as spawnCommand, ChildProcess } from 'child_process';

type spawn = (command: string, args?: string[]) => Promise<ChildProcess>;

export const spawn: spawn = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const ps = spawnCommand(command, args, { stdio: 'inherit' });
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
