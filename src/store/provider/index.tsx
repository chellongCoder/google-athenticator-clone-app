import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '..';

const AppStateProvider = (props) => {
  const { children } = props;
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};

export default AppStateProvider;
