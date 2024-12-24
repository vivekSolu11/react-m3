import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSaga from './saga';
import rootReducer from './reducer';

// Setup saga middleware
const sagaMiddleware = createSagaMiddleware();

// Redux Persist configuration
const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['modal'], // State keys you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Setup store
const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: false,
			serializableCheck: {
				// Ignore redux-persist actions
				ignoredActions: [
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/REGISTER',
					'persist/PAUSE',
					'persist/PURGE',
					'persist/FLUSH',
				],
				ignoredPaths: ['_persist'], // Ignore redux-persist state key
			},
		}).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Setup persistor
const persistor = persistStore(store);

export { store, persistor };
