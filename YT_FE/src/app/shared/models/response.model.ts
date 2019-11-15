export interface ServerResponse<T> {
    code: number;
    payload: T;
    description: string;
}