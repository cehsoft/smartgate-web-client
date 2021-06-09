import jwtDecode, { JwtPayload } from "jwt-decode";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "@/libs/http";

export const doLogin = createAsyncThunk(
  "session/login",
  async ({ username, password }: { username: string; password: string }) => {
    const resp = await http.client.post("/api/login", {
      user: username,
      pass: password,
    });

    http.setToken(resp.data.access_token);
    return resp.data as { access_token: string; refresh_token: string };
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
        action.payload.access_token
      );
      state.user = decoded.user;
      state.token = action.payload.access_token;
    });
    builder.addCase(doLogin.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { updateUserInfo } = sessionSlice.actions;
export const { reducer } = sessionSlice;
