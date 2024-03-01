export const useFP = () => {
  const pipe =
    (...fns: Function[]) =>
    (arg: any) =>
      fns.reduce((acc, fn) => fn(acc), arg);

  return {
    pipe,
  };
};
