export const useToggle = (raw: boolean, value?: boolean | unknown) => {
  return typeof value === "boolean" ? value : !raw;
};
