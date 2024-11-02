import { Gene } from "@gekojs/core";
import { WebServerConfig, WebServerMethod } from "./types";
import { WebServer } from "./web-server";
export declare class CreateServer extends Gene<{
    config: WebServerConfig;
}, {
    server: WebServer;
}> {
    onInit(): void;
}
export declare class StartServer extends Gene<{
    server: WebServer;
}, {
    listening: boolean;
}> {
    onInit(): void;
}
export declare class WireEndpoint<RequestType> extends Gene<{
    server: WebServer;
    route: string;
    method: WebServerMethod;
}, {
    wire: RequestType;
}> {
    onInit(): void;
}
