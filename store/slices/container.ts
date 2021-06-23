import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { grpc } from "@improbable-eng/grpc-web";

import { grpcInvoke } from "@/libs/grpc";
import { MyGRPC } from "@/libs/proto/service_pb_service";
import {
  ReqEmpty,
  ResMLResult,
  ReqConfirmContainerID,
} from "@/libs/proto/service_pb";

export const doConfirm = createAsyncThunk(
  "container/confirm",
  async (
    { suggestId, containerId }: { suggestId: number; containerId: string },
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    const req = new ReqConfirmContainerID();
    req.setContainerid(containerId);
    req.setSuggestid(suggestId);

    grpcInvoke(MyGRPC.confirmContainerID, {
      request: req,
      onEnd: (code, msg, trailers) => {
        if (code == grpc.Code.OK) {
          fulfillWithValue(code);
          dispatch(reset());
        } else {
          console.log({ code, msg, trailers });
          rejectWithValue({ code, msg, trailers });
        }
      },
    });
  }
);

export const doPullMLResult = createAsyncThunk(
  "container/pullMLResult",
  async (args, { dispatch, fulfillWithValue, rejectWithValue }) => {
    grpcInvoke(MyGRPC.pullMLResult, {
      request: new ReqEmpty(),
      onMessage: (message: ResMLResult) => {
        const result = message.toObject();
        dispatch(containerSlice.actions.addNewResult(result));
      },
      onEnd: (code, msg, trailers) => {
        if (code == grpc.Code.OK) {
          fulfillWithValue(code);
        } else {
          rejectWithValue({ code, msg, trailers });
        }
      },
    });
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
    builder.addCase(doConfirm.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(doConfirm.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(doConfirm.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
    builder.addCase(doPullMLResult.pending, (state, action) => {});
    builder.addCase(doPullMLResult.fulfilled, (state, action) => {});
    builder.addCase(doPullMLResult.rejected, (state, action) => {});
  },
});

export const { addNewResult, reset } = containerSlice.actions;
export const { reducer } = containerSlice;
