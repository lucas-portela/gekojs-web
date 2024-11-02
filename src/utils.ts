export class PromiseQueue<ValueType> {
  private _responseResolvers: ((value: ValueType) => void)[] = [];
  private _responsePromises: Promise<ValueType>[] = [];

  add(value: ValueType) {
    if (this._responseResolvers.length > 0) {
      this._responseResolvers[0](value);
      this._responsePromises = this._responsePromises.slice(1);
      this._responseResolvers = this._responseResolvers.slice(1);
    }
  }

  wait() {
    const responsePromise = new Promise<ValueType>((resolve) => {
      this._responseResolvers.push(resolve);
    });
    this._responsePromises.push(responsePromise);
    return {
      read: responsePromise,
      wait: Promise.all(this._responsePromises.slice(0, -1)),
    };
  }
}
