import { $wire, Wire } from "@gekojs/core";
import { WebServerConfig, WebServerMethod } from "./types";
import { CreateServer, StartServer, WireEndpoint } from "./genes";
import { WebServer } from "./web-server";

export const $server = {
  create: (server: Wire<WebServer>, config: Wire<WebServerConfig>) =>
    new CreateServer().input({ config }).output({ server: [server] }),
  start: (server: Wire<WebServer>) => new StartServer().input({ server }),
  wire: <RequestType, ResponseType>(
    server: Wire<WebServer>,
    {
      route,
      method,
      response,
      request,
      constant,
    }: {
      route?: Wire<string>;
      method?: Wire<WebServerMethod>;
      response?: Wire<ResponseType>;
      request?: Wire<RequestType>[];
      constant?: Wire<boolean>;
    }
  ) =>
    new WireEndpoint()
      .input({ server, route, method, response, constant })
      .output({ request }),
};

export const $method = (method: WebServerMethod) =>
  $wire<WebServerMethod>(method);
