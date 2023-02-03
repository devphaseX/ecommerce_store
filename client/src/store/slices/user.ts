import { createSlice } from '@reduxjs/toolkit';

type User = {};

type ClientInfo = { user: User | null; logout?: boolean };

const getInitialClientInfo = (): ClientInfo => ({
  user: null,
  logout: false,
});

const clientInfo = createSlice({
  name: 'clientInfo',
  initialState: getInitialClientInfo(),
  reducers: {},
});

export { clientInfo };

export const { actions: clientInfoActions, reducer: clientInfoReducer } =
  clientInfo;
