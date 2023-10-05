export interface IResponse<T> {
  get: string;
  parameters: {
    [key: string]: string;
  };
  errors:
    | string[]
    | {
        [key: string]: string;
      };
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T[];
}
