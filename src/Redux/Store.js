import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
};
export const rootReducer = combineReducers({
  user: UserReducer,
  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer

const store = configureStore({
  reducer:persistedReducer
});

// Create a persistor
const persistor = persistStore(store);




export { store, persistor };
