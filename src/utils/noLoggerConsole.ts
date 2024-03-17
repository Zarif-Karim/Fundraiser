export const NoLogConsole: Console = {
    ...console,
    info: () => {},
};
