import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Issue } from '../types/Issue';
import { getClosedIssues, getRepoInfo, getRepoIssues, getRepoIssuesWithAsignee } from '../api/getIssues';
import { DropResult } from 'react-beautiful-dnd';

type IssuesState = {
  todos: Issue[];
  inProgress: Issue[];
  closed: Issue[];
  loading: boolean;
  hasError: boolean;
  stars: number;
  owner: string;
  repo: string;
};

const initialState: IssuesState = {
  todos: [],
  inProgress: [],
  closed: [],
  loading: false,
  hasError: false,
  stars: 0,
  owner: '',
  repo: '',
};

export const fetchIssues = createAsyncThunk(
  'issues/fetch',
  async (url: string) => {
    const owner = url.split('/')[0];
    const repo = url.split('/')[1];

    const [repoInfo, todos, inProgress, closed] = await Promise.all([
      getRepoInfo(url),
      getRepoIssues(url),
      getRepoIssuesWithAsignee(url),
      getClosedIssues(url)
    ]);

    const localStorageKey = url;
    
    const data = {
      todos,
      inProgress,
      closed,
      owner,
      repo,
      stars: repoInfo.stargazers_count,
    };
    
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    
    return data;
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    reorderIssues: (state, action: PayloadAction<DropResult>) => {
      const { source, destination } = action.payload;

      const findIssuesArray = (droppableId: string): Issue[] => {
        const checkId = droppableId.toLowerCase();

        switch (checkId) {
        case 'todo':
          return state.todos;
        case 'inprogress':
          return state.inProgress;
        case 'closed':
          return state.closed;
        default:
          throw new Error('Invalid droppableId');
        }
      };

      if (!destination) {
        return;
      }

      const sourceIssues = findIssuesArray(source.droppableId);
      const destinationIssues = findIssuesArray(destination.droppableId);

      const [removed] = sourceIssues.splice(source.index, 1);
      destinationIssues.splice(destination.index, 0, removed);

      const localStorageKey = `${state.owner}/${state.repo}`;

      const data = {
        todo: state.todos,
        inProgress: state.inProgress,
        done: state.closed,
        owner: state.owner,
        repo: state.repo,
        stars: state.stars,
      };

      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        state.inProgress = action.payload.inProgress;
        state.closed = action.payload.closed;
        state.owner = action.payload.owner;
        state.repo = action.payload.repo;
        state.stars = action.payload.stars;
        state.loading = false;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});



export const { reorderIssues } = issuesSlice.actions;

export default issuesSlice.reducer;