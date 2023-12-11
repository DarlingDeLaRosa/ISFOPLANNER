export interface ResponseAccionI{
    ok: boolean,
    statusCode: number,
    detail: string,
    data: {}
}
export interface ResponseResponsableI{
    ok: boolean,
    statusCode: number,
    detail: string,
    token: string,
    data: string
}
export interface removerResponsableI{
    ok: boolean,
    statusCode: number,
    detail: string,
}
