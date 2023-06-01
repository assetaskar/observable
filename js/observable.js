export default function (fn) {
  class Observable {
    events = [];

    handler = new Proxy(fn, {
      async apply(target, self, args) {
        const dataTarget = await target(...args);
        for (const event of self.events) {
          event(dataTarget);
        }
        return dataTarget;
      }
    });

    push(event) {
      this.events.push(event);
    }
  }

  const observable = new Observable();

  const result = observable.handler.bind(observable);
  result.subscribe = observable.push.bind(observable);

  return result;
}
