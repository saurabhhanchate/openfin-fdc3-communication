import { fdc3Ready } from '@finos/fdc3';
import type OpenFin from '@openfin/core';

const RECEIVER_UUID = 'receiver_uuid';
const CONTEXT_GROUP = 'green';
const CONTEXT_TYPE = 'fdc3.instrument';

const log = logger();

let receiver: OpenFin.InteropClient;

fdc3Ready().then(() => {
  const btnBroadcast = document.getElementById('btnBroadcast');
  btnBroadcast.addEventListener('click', async () => {
    if (!receiver) {
      receiver = fin.Interop.connectSync(RECEIVER_UUID, {});

      await receiver.joinContextGroup(CONTEXT_GROUP);
      window.fdc3.joinUserChannel(CONTEXT_GROUP);

      receiver.addContextHandler(log, CONTEXT_TYPE);
    }

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
