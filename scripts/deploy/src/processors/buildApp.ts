import { spawn } from './../lib/commands';

export const buildApp = () => {
  return spawn('yarn', ['build']);
};
