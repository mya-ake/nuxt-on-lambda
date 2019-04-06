import { spawn } from './../lib/commands';

export const deployApp = () => {
  return spawn('yarn', ['sls:deploy']);
};
