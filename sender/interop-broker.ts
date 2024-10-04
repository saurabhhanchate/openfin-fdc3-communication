import type OpenFin from '@openfin/core';

export function interopOverride(
  InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>
): OpenFin.InteropBroker {
  class Override extends InteropBroker {
    allowedOrigins = ['http://localhost:3000'];

    isConnectionAuthorized(id, payload): boolean | Promise<boolean> {
      if (id.uuid === fin.me.uuid) {
        return true;
      }

      const connectionUrl = new URL(id.connectionUrl);
      return this.allowedOrigins.includes(connectionUrl.origin);
    }

    constructor() {
      super();
    }
  }

  return new Override();
}
