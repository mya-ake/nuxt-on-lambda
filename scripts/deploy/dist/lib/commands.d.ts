/// <reference types="node" />
import { ChildProcess } from 'child_process';
declare type spawn = (command: string, args?: string[]) => Promise<ChildProcess>;
export declare const spawn: spawn;
export {};
