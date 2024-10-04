import type OpenFin from '@openfin/core';

export function interopOverride(
  InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>
): OpenFin.InteropBroker {
  class Override extends InteropBroker {
    allowedOrigins = ['http://localhost:4200'];
    broadcastChannel = new BroadcastChannel(fin.me.uuid);

    isConnectionAuthorized(id, payload): boolean | Promise<boolean> {
      if (id.uuid === fin.me.uuid) {
        return true;
      }

      const connectionUrl = new URL(id.connectionUrl);
      if (this.allowedOrigins.includes(connectionUrl.origin)) {
        this.broadcastChannel.postMessage({ uuid: id.uuid });
        return true;
      }

      return false;
    }

    constructor() {
      super();
    }
  }

  return new Override();
}
