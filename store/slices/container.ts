import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { grpc } from "@improbable-eng/grpc-web";

import { grpcInvoke } from "@/libs/grpc";
import { MyGRPC } from "@/libs/proto/service_pb_service";
import {
  ResMLResult,
  ReqPullMLResult,
  ResListContainerOCRs,
  ContainerOCR,
  ReqListContainerOCRs,
  RequestPaging,
} from "@/libs/proto/service_pb";

let puller;

export const doPullMLResult = createAsyncThunk(
  "container/pullMLResult",
  async (
    { laneId }: { laneId: number },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    if (puller) {
      puller.close();
    }

    const req = new ReqPullMLResult();
    req.setLaneid(laneId);

    puller = grpcInvoke(MyGRPC.pullMLResult, {
      request: req,
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

export const doListOCRs = createAsyncThunk(
  "container/listOCRs",
  async (
    {
      offset = 0,
      limit = 10,
      laneId,
    }: { offset?: number; limit?: number; laneId: number },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    let req = new ReqListContainerOCRs();
    let paging = new RequestPaging();
    paging.setOffset(offset);
    paging.setLimit(limit);
    req.setPaging(paging);
    req.setLaneid(laneId);

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
    ocrs: [] as ContainerOCR.AsObject[],
    status: "idle",
    error: null,
  },
  reducers: {
    addNewResult: (state, { payload }: PayloadAction<ResMLResult.AsObject>) => {
      state.trackingResults.push(payload);
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
    builder.addCase(doPullMLResult.pending, (state, action) => {});
    builder.addCase(doPullMLResult.fulfilled, (state, action) => {});
    builder.addCase(doPullMLResult.rejected, (state, action) => {});
    builder.addCase(doListOCRs.pending, (state, action) => {});
    builder.addCase(doListOCRs.fulfilled, (state, action) => {});
    builder.addCase(doListOCRs.rejected, (state, action) => {});
  },
});

export const { addNewResult, reset, discard } = containerSlice.actions;
export const { reducer } = containerSlice;
