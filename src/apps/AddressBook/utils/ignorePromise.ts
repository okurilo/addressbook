export const ignorePromise = (promise: Promise<unknown>): void => {
  void promise.catch(() => undefined);
};

