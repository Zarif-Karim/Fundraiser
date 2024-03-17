export interface Logger {
    error: (...input: any) => void;
    info: (...input: any) => void;
    warn: (...input: any) => void;
}
