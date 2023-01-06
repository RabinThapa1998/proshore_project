import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '~/global-states/store/store';
import { IQueryParams, IQueryResult } from '~/types';

interface IQueryRes {
  queryResult: IQueryResult | null;
}
const initialQueriesState: IQueryParams & IQueryRes = {
  query: '',
  page: 1,
  per_page: 10,
  order: 'desc',
  sort: '',
  queryResult: null,
};

export const querySlice = createSlice({
  name: 'query',
  initialState: initialQueriesState,
  reducers: {
    setQueriesGlobalState: (state, action: PayloadAction<Partial<IQueryParams>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setQueryResultGlobalState: (state, action: PayloadAction<IQueryRes>) => {
      return {
        ...state,
        queryResult: action.payload.queryResult,
      };
    },
  },
});

export const { setQueriesGlobalState, setQueryResultGlobalState } = querySlice.actions;
export const selectQueryGlobalState = (state: RootState) => state.searchReducer;
export const selectQueryResultGlobalState = (state: RootState) => state.searchReducer.queryResult;
export default querySlice.reducer;
