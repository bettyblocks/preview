// TODO: move to ENV variable or constant
const uri = 'http://localhost:5001';

export const normalize = <T extends { name: string }>(
  array: T[]
): Record<string, T> =>
  array.reduce(
    (acc: Record<string, T>, item: T): Record<string, T> => ({
      [item.name]: item,
      ...acc
    }),
    {}
  );

export const fetchList = <T extends { name: string }>(
  file: string
): Promise<T[]> =>
  fetch(`${uri}/${file}.json`, { cache: 'no-cache' }).then(
    (response: Response): Promise<Array<T>> => response.json()
  );
