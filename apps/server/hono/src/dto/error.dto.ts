export const errorDto = (errors: string[]) => ({
  errors: { body: errors },
});
