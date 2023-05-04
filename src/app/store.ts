import { configureStore } from '@reduxjs/toolkit';
import urlReducer from '../features/URLSlice';
import issuesReducer from '../features/IssuesSlice';


export const store = configureStore({
  reducer: {
    url: urlReducer,
    issues: issuesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
