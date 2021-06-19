import jwtDecode, { JwtPayload } from "jwt-decode";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { http } from "@/libs/http";

export const doLogin = createAsyncThunk(
  "session/login",
  async ({ username, password }: { username: string; password: string }) => {
    // http.setToken(resp.data.access_token);
    return {
      user: username,
      pass: password,
    };
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    user: "",
    token: "",
    status: "idle",
    error: null,
  },
  reducers: {
    updateUserInfo: (
      state,
      { payload }: PayloadAction<{ name: string; token: string }>
    ) => {
      state.user = payload.name;
      state.token = payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const decoded = jwtDecode<JwtPayload & { user: string }>(
        action.payload.user
      );
      state.user = decoded.user;
      state.token = action.payload.pass;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { updateUserInfo } = sessionSlice.actions;
export const { reducer } = sessionSlice;
