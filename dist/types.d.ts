export type WebServerConfig = {
    port?: number;
    parseJson?: boolean;
};
export type WebServerRequestHandler<RequestType, ResponseType> = (req: RequestType, status: (code: number) => void) => Promise<ResponseType>;
export declare enum WebServerMethod {
    Get = "get",
    Post = "post",
    Put = "put",
    Search = "search",
    Delete = "delete"
}
