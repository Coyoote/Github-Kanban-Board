import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Issue } from '../types/Issue';
import { getClosedIssues, getRepoInfo, getRepoIssues, getRepoIssuesWithAsignee } from '../api/getIssues';

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

    const localStorageKey = `${owner}/${repo}`;
    let data;

    const parsedData = localStorage.getItem(localStorageKey);
    
    if (parsedData) {
      data = JSON.parse(parsedData);
    } else {
      const repoInfo = await getRepoInfo(url);
      const todos = await getRepoIssues(url);
      const inProgress = await getRepoIssuesWithAsignee(url);
      const closed = await getClosedIssues(url);

      data = {
        todos,
        inProgress,
        closed,
        owner,
        repo,
        stars: repoInfo.stargazers_count,
      };

      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }
    
    return data;
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    manageIssues: (state, action) => {
      const { source, destination } = action.payload;

      const getDroppableList = (droppableId: string): Issue[] => {
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

      const sourceIssues = getDroppableList(source.droppableId);
      const destinationIssues = getDroppableList(destination.droppableId);

      const [removed] = sourceIssues.splice(source.index, 1);
      destinationIssues.splice(destination.index, 0, removed);

      const localStorageKey = `${state.owner}/${state.repo}`;

      const data = {
        todos: state.todos,
        inProgress: state.inProgress,
        closed: state.closed,
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
        state.hasError = false;
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
        state.hasError = false;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { manageIssues } = issuesSlice.actions;
export default issuesSlice.reducer;