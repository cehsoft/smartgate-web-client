import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { grpc } from "@improbable-eng/grpc-web";

import { grpcInvoke } from "@/libs/grpc";
import { MyGRPC } from "@/libs/proto/service_pb_service";
import {
  ReqEmpty,
  ResMLResult,
  ReqConfirmContainerID,
  ResListContainerTrackings,
  ResListContainerOCRs,
  ContainerTracking,
  ContainerOCR,
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

let puller;

export const doPullMLResult = createAsyncThunk(
  "container/pullMLResult",
  async (args, { dispatch, fulfillWithValue, rejectWithValue }) => {
    if (!puller) {
      puller = grpcInvoke(MyGRPC.pullMLResult, {
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
  }
);

export const doListTracking = createAsyncThunk(
  "container/listTracking",
  async (
    { offset = 0, limit = 10 }: { offset?: number; limit?: number },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    let req = new ReqEmpty();
    req.setOffset(offset);
    req.setLimit(limit);

    grpcInvoke(MyGRPC.listContainerTrackings, {
      request: req,
      onMessage: (message: ResListContainerTrackings) => {
        const result = message.toObject();

        dispatch(
          containerSlice.actions.addTrackings({
            data: result.trackingsList,
            total: result.total,
          })
        );
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

export const doListOCRs = createAsyncThunk(
  "container/listOCRs",
  async (
    { offset = 0, limit = 10 }: { offset?: number; limit?: number },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    let req = new ReqEmpty();
    req.setOffset(offset);
    req.setLimit(limit);

    grpcInvoke(MyGRPC.listContainerOCRs, {
      request: req,
      onMessage: (message: ResListContainerOCRs) => {
        const result = message.toObject();
        dispatch(
          containerSlice.actions.addOCRs({
            data: result.ocrsList,
            total: result.total,
          })
        );
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
    totalTracking: 0,
    totalOCR: 0,
    trackings: [] as ContainerTracking.AsObject[],
    ocrs: [] as ContainerOCR.AsObject[],
    status: "idle",
    error: null,
  },
  reducers: {
    addNewResult: (state, { payload }: PayloadAction<ResMLResult.AsObject>) => {
      state.trackingResults.push(payload);
    },
    addTrackings: (
      state,
      {
        payload,
      }: PayloadAction<{ data: ContainerTracking.AsObject[]; total: number }>
    ) => {
      state.trackings = payload.data;
      state.totalTracking = payload.total;
    },
    addOCRs: (
      state,
      {
        payload,
      }: PayloadAction<{ data: ContainerOCR.AsObject[]; total: number }>
    ) => {
      state.ocrs = payload.data;
      state.totalOCR = payload.total;
    },
    discard: (state, { payload }: PayloadAction<{ suggestId: number }>) => {
      state.trackingResults = state.trackingResults.filter(
        (t) => t.suggestid !== payload.suggestId
      );
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
    builder.addCase(doListTracking.pending, (state, action) => {});
    builder.addCase(doListTracking.fulfilled, (state, action) => {});
    builder.addCase(doListTracking.rejected, (state, action) => {});
    builder.addCase(doListOCRs.pending, (state, action) => {});
    builder.addCase(doListOCRs.fulfilled, (state, action) => {});
    builder.addCase(doListOCRs.rejected, (state, action) => {});
  },
});

export const { addNewResult, reset, discard } = containerSlice.actions;
export const { reducer } = containerSlice;
