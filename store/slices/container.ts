import jwtDecode, { JwtPayload } from "jwt-decode";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { grpc } from "@improbable-eng/grpc-web";
import { TextInput, Button } from "carbon-components-react";

import { MyGRPC } from "@/libs/proto/service_pb_service";
import { ReqEmpty, ResMLResult } from "@/libs/proto/service_pb";

export const confirm = createAsyncThunk(
  "container/confirm",
  async (args, { dispatch }) => {
    console.log(">>>> here");
    dispatch(reset());

    // grpc.invoke(MyGRPC.pullMLResult, {
    //   transport: grpc.WebsocketTransport(),
    //   request: new ReqEmpty(),
    //   host: "http://localhost:3000",
    //   onMessage: (message: ResMLResult) => {
    //     const result = message.toObject();
    //     dispatch(containerSlice.actions.addNewResult(result));
    //   },
    //   onEnd: (code, msg, trailers) => {
    //     if (code == grpc.Code.OK) {
    //       fulfillWithValue(code);
    //     } else {
    //       console.log("here");
    //       rejectWithValue({ code, msg, trailers });
    //     }
    //   },
    // });
  }
);

export const containerSlice = createSlice({
  name: "container",
  initialState: {
    trackingResults: [] as ResMLResult.AsObject[],
    status: "idle",
    error: null,
  },
  reducers: {
    addNewResult: (state, { payload }: PayloadAction<ResMLResult.AsObject>) => {
      state.trackingResults.push(payload);
    },
    reset: (state) => {
      state.trackingResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(confirm.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(confirm.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(confirm.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { addNewResult, reset } = containerSlice.actions;
export const { reducer } = containerSlice;
