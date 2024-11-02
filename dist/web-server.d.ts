import { WebServerConfig, WebServerMethod, WebServerRequestHandler } from "./types";
export declare class WebServer {
    private _config;
    private _expressApp;
    private _listening;
    private readonly _defaultMime;
    constructor(_config: WebServerConfig);
    middleware<RequestType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, boolean>;
        mime?: string;
    }): void;
    listen(): Promise<void>;
    get<RequestType, ResponseType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, ResponseType>;
        mime?: string;
    }): void;
    post<RequestType, ResponseType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, ResponseType>;
        mime?: string;
    }): void;
    put<RequestType, ResponseType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, ResponseType>;
        mime?: string;
    }): void;
    search<RequestType, ResponseType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, ResponseType>;
        mime?: string;
    }): void;
    delete<RequestType, ResponseType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, ResponseType>;
        mime?: string;
    }): void;
    endpoint<RequestType, ResponseType>(params: {
        route: string;
        handler: WebServerRequestHandler<RequestType, ResponseType>;
        mime?: string;
        method?: WebServerMethod;
    }): void;
}
