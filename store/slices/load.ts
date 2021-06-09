import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TOKEN_FROM_SERVER = "token_from_server";

export enum Loads {
  TOKEN_FROM_SERVER = "token_from_server",
  DATA_NON_AVAILABLE = "not_available",
}

enum Status {
  NO_RESOLVE = "no_resolve",
}

export const loadSlice = createSlice({
  name: "load",
  initialState: {
    loaded: {},
  },
  reducers: {
    noResolve(state, { payload }: PayloadAction<Loads>) {
      state.loaded[payload] = Status.NO_RESOLVE;
    },
    loaded(state, { payload }: PayloadAction<Loads>) {
      state.loaded[payload] = true;
    },
  },
});

export const { loaded, noResolve } = loadSlice.actions;
export const { reducer } = loadSlice;
