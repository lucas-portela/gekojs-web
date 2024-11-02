export class AddingRouteAfterListeningError extends Error {
  constructor() {
    super("Can't add endpoint after WebServer is listening!");
  }
}
