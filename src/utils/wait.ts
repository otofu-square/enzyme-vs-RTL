type Wait = (ms: number) => Promise<void>;
export const wait: Wait = (ms = 1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
