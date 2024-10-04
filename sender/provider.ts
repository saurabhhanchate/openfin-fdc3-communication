import { interopOverride } from './interop-broker';

async function launchMatrix() {
  const {
    matrixSnapshot: { windows },
  }: any = await fin.Application.getCurrentSync().getManifest();

  const appWin = await fin.Window.create(windows[0]);
  await appWin.on('closed', () => fin.Platform.getCurrentSync().quit());
  await appWin.focus();
}

async function init() {
  await launchMatrix();
  await fin.Platform.init({ interopOverride });
}

init();
