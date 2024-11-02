export type WebServerConfig = {
  port?: number;
  parseJson?: boolean;
};

export type WebServerRequestHandler<RequestType, ResponseType> = (
  req: RequestType,
  status: (code: number) => void
) => Promise<ResponseType>;

export type WebServerMethod = "get" | "post" | "put" | "search" | "delete";
