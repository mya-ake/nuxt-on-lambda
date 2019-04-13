/// <reference types="node" />
export declare const extractFileName: (pathname: string) => string;
export declare const extractExtension: (pathname: string) => string;
export declare const isDirectory: (pathname: string) => Promise<boolean>;
export declare const getFilePathnames: (dirPathname: string) => Promise<string[]>;
export declare const readFile: (pathname: string) => Promise<Buffer>;
