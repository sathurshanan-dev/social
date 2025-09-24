import { configureStore } from '@reduxjs/toolkit';
import { api_slice } from './slices/api';
import auth_reducer from './slices/auth';

const store = configureStore({
  reducer: {
    [api_slice.reducerPath]: api_slice.reducer,
    auth: auth_reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api_slice.middleware),
  devTools: true,
});

export default store;
