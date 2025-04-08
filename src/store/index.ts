
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
