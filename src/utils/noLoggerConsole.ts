export const NoLogConsole: Console = {
    ...console,
    log: () => {},
};
