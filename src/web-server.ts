import { AddingRouteAfterListeningError } from "./errors";
import {
  WebServerConfig,
  WebServerMethod,
  WebServerRequestHandler,
} from "./types";
import * as express from "express";

export class WebServer {
  private _expressApp: express.Application;
  private _listening: boolean = false;
  private readonly _defaultMime = "application/json";

  constructor(private _config: WebServerConfig) {
    this._expressApp = express();
    if (this._config.parseJson !== false) this._expressApp.use(express.json());
  }

  middleware<RequestType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, boolean>;
    mime?: string;
  }) {
    if (this._listening) throw new AddingRouteAfterListeningError();
    this._expressApp.get(params.route, async (req, res, next) => {
      const status = (code: number) => (res.statusCode = code);
      let callNext: boolean;
      try {
        if (["get", "search", "delete"].includes(req.method))
          callNext = await params.handler(req.query as RequestType, status);
        if (["get", "search", "delete"].includes(req.method))
          callNext = await params.handler(req.query as RequestType, status);
      } catch (err) {
        console.error(err);
        throw err;
      }
      if (callNext) next();
    });
  }

  listen() {
    return new Promise<void>((resolve) => {
      this._expressApp.listen(this._config.port ?? 80, () => {
        resolve();
      });
    });
  }

  get<RequestType, ResponseType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, ResponseType>;
    mime?: string;
  }) {
    if (this._listening) throw new AddingRouteAfterListeningError();
    this._expressApp.get(params.route, async (req, res) => {
      const status = (code: number) => (res.statusCode = code);
      res.setHeader("content-type", params.mime ?? this._defaultMime);
      res.send(await params.handler(req.query as RequestType, status));
    });
  }

  post<RequestType, ResponseType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, ResponseType>;
    mime?: string;
  }) {
    if (this._listening) throw new AddingRouteAfterListeningError();
    this._expressApp.post(params.route, async (req, res) => {
      const status = (code: number) => (res.statusCode = code);
      res.setHeader("content-type", params.mime ?? this._defaultMime);
      res.send(await params.handler(req.body as RequestType, status));
    });
  }

  put<RequestType, ResponseType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, ResponseType>;
    mime?: string;
  }) {
    if (this._listening) throw new AddingRouteAfterListeningError();
    this._expressApp.put(params.route, async (req, res) => {
      const status = (code: number) => (res.statusCode = code);
      res.setHeader("content-type", params.mime ?? this._defaultMime);
      res.send(await params.handler(req.body as RequestType, status));
    });
  }

  search<RequestType, ResponseType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, ResponseType>;
    mime?: string;
  }) {
    if (this._listening) throw new AddingRouteAfterListeningError();
    this._expressApp.search(params.route, async (req, res) => {
      const status = (code: number) => (res.statusCode = code);
      res.setHeader("content-type", params.mime ?? this._defaultMime);
      res.send(await params.handler(req.query as RequestType, status));
    });
  }

  delete<RequestType, ResponseType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, ResponseType>;
    mime?: string;
  }) {
    if (this._listening) throw new AddingRouteAfterListeningError();
    this._expressApp.delete(params.route, async (req, res) => {
      const status = (code: number) => (res.statusCode = code);
      res.setHeader("content-type", params.mime ?? this._defaultMime);
      res.send(await params.handler(req.query as RequestType, status));
    });
  }

  endpoint<RequestType, ResponseType>(params: {
    route: string;
    handler: WebServerRequestHandler<RequestType, ResponseType>;
    mime?: string;
    method?: WebServerMethod;
  }) {
    const method = params.method ?? "get";
    this[method](params);
  }
}
