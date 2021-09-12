import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { grpc } from "@improbable-eng/grpc-web";

import { grpcInvoke } from "@/libs/grpc";
import { MyGRPC } from "@/libs/proto/service_pb_service";
import {
  // listLanes
  Lane,
  ReqListLanes,
  ResListLanes,
  // listCamSettings
  CamSetting,
  ReqListCamSettings,
  ResListCamSettings,
} from "@/libs/proto/service_pb";

export const doListLanes = createAsyncThunk(
  "setting/listLanes",
  (args, { dispatch }) => {
    let req = new ReqListLanes();
    console.log("req", req);

    grpcInvoke(MyGRPC.listLanes, {
      request: req,
      onMessage: (message: ResListLanes) => {
        const result = message.toObject();
        dispatch(
          settingSlice.actions.addLanes({
            data: result.lanesList,
          })
        );
      },
      onEnd: (code, msg, trailers) => {},
    });
  }
);

export const doListCamSettings = createAsyncThunk(
  "setting/listCamSettings",
  (
    { laneId }: { laneId: number },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    let req = new ReqListCamSettings();
    req.setLaneid(laneId);

    grpcInvoke(MyGRPC.listCamSettings, {
      request: req,
      onMessage: (message: ResListCamSettings) => {
        const result = message.toObject();
        dispatch(
          settingSlice.actions.addCams({
            data: result.settingsList,
          })
        );
      },
      onEnd: (code, msg, trailers) => {},
    });
  }
);

export const settingSlice = createSlice({
  name: "settings",
  initialState: {
    lanes: [] as Lane.AsObject[],
    cams: [] as CamSetting.AsObject[],
    status: "idle",
    error: null,
  },
  reducers: {
    addLanes: (
      state,
      { payload }: PayloadAction<{ data: Lane.AsObject[]; total?: number }>
    ) => {
      state.lanes = payload.data;
    },
    addCams: (
      state,
      {
        payload,
      }: PayloadAction<{ data: CamSetting.AsObject[]; total?: number }>
    ) => {
      state.cams = payload.data;
    },
  },
  extraReducers: (builder) => {},
});

export const { addLanes, addCams } = settingSlice.actions;
export const { reducer } = settingSlice;
