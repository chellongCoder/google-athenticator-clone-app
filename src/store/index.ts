import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers';

const logger = createLogger({
    collapsed: true,
    timestamp: false,
    duration: true,
  });
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareProduction: any[] = [];
if (__DEV__) {
  middlewareProduction.push(logger);
}
// Redux: Store
const store = createStore(persistedReducer, applyMiddleware(...middlewareProduction));
let persistor = persistStore(store);
export { store, persistor };