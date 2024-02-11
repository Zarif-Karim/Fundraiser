import { NoLogConsole } from "./noLoggerConsole";

export const noConsoleLogForTest = () => {
  const originalConsole = console;
  beforeAll(() => {
    console = NoLogConsole;
  });

  afterAll(() => {
    console = originalConsole;
  });
};
