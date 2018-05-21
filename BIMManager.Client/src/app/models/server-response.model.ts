export interface IServerResponse<T> {
  meta: {
    total: number;
  };
  result: T;
}
