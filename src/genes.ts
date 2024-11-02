import { $first, $last, $queue, Gene, QueueWire, Wire } from "@gekojs/core";
import { WebServerConfig, WebServerMethod } from "./types";
import { WebServer } from "./web-server";
import { PromiseQueue } from "./utils";

export class CreateServer extends Gene<
  { config: WebServerConfig },
  { server: WebServer }
> {
  onInit(): void {
    this.watch("config", (config) =>
      this.write("server", new WebServer(config))
    );
  }
}

export class StartServer extends Gene<
  { server: WebServer },
  { listening: boolean }
> {
  onInit(): void {
    this.watch(
      "server",
      $last(async (server) => {
        await server.listen();
        this.write("listening", true);
      })
    );
  }
}

export class WireEndpoint<RequestType, ResponseType> extends Gene<
  {
    server: WebServer;
    route: string;
    method: WebServerMethod;
    response: ResponseType;
    constant: boolean;
  },
  { request: RequestType }
> {
  private _responseQueue: PromiseQueue<ResponseType>;
  private _req: QueueWire<RequestType>;

  constructor() {
    super();
    this._req = $queue<RequestType>();
    this._responseQueue = new PromiseQueue<ResponseType>();
  }

  onInit(): void {
    this._req.pipe(this.outputWire("request"));
    this.watch("response", (response) => {
      this._responseQueue.add(response);
    });
    this.watch("route", async (route) => {
      const server = await this.wait("server");
      const method = this.read("method");
      const constant = this.read("constant");
      server.endpoint<RequestType, ResponseType>({
        route,
        method,
        handler: async (req) => {
          const hasResponse = !!this.inputWire("response");
          this._req.value = req;

          if (constant) {
            let { read, wait } = this._responseQueue.wait();
            await wait;
            this._req.pop();

            if (!hasResponse) await this._responseQueue.add(null);
            return await read;
          } else {
            this._req.pop();
            return hasResponse ? this.read("response") : null;
          }
        },
      });
    });
  }

  onFreeze(): void {
    this._req.unpipe(this.outputWire("request"));
  }
}
