import { fdc3Ready } from '@finos/fdc3';
import type OpenFin from '@openfin/core';

// const SENDER_UUID = 'sender_uuid';
const CONTEXT_GROUP = 'green';
const CONTEXT_TYPE = 'fdc3.instrument';

const log = logger();

let sender: OpenFin.InteropClient;

fdc3Ready().then(() => {
  const broadcastChannel = new BroadcastChannel(fin.me.uuid);
  broadcastChannel.onmessage = async (event) => {
    if (
      Object.prototype.toString.call(event?.data) === '[object Object]' &&
      event.data.hasOwnProperty('uuid')
    ) {
      const { uuid } = event.data;

      sender = fin.Interop.connectSync(uuid, {});

      await sender.joinContextGroup(CONTEXT_GROUP);
      window.fdc3.joinUserChannel(CONTEXT_GROUP);

      sender.addContextHandler(log, CONTEXT_TYPE);
    }
  };

  const btnBroadcast = <HTMLInputElement>(
    document.getElementById('btnBroadcast')
  );

  btnBroadcast.addEventListener('click', () => {
    broadcast();
  });
});

function broadcast() {
  const currencyPair = (<HTMLInputElement>document.getElementById('txtInput'))
    .value;

  const context: OpenFin.Context = {
    id: {
      ticker: currencyPair,
    },
    type: CONTEXT_TYPE,
  };

  window.fdc3.broadcast(context);
}

function logger() {
  let i = 1;
  const log = document.getElementById('log');

  return (input) => {
    const msg = document.createElement('pre');
    msg.textContent = `${i++}) ${JSON.stringify(input)}`;
    log.appendChild(msg);
  };
}
