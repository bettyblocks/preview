export default <T extends { name: string }>(array: T[]): Record<string, T> =>
  array.reduce(
    (acc: Record<string, T>, item: T): Record<string, T> => ({
      [item.name]: item,
      ...acc
    }),
    {}
  );
