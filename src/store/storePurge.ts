import type { Persistor } from 'redux-persist';

let _persistor: Persistor | null = null;

export const registerPersistor = (p: Persistor): void => {
  _persistor = p;
};

export const purgeStore = (): void => {
  void _persistor?.purge();
};
