import { dissoc, groupBy, mapObjIndexed } from "ramda";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "@/libs/http";
import { useSelector } from "../hooks";

export const doGetMediaSizes = createAsyncThunk(
  "video/getMediaSize",
  async () => {
    const resp = await http.client.get("/api/resource/environment/media-size");
    return resp.data as any[];
  }
);

export const doGetStreams = createAsyncThunk("video/getStreams", async () => {
  const resp = await http.client.get("/api/sessions/streams");
  return resp.data as { streams: { name: string; url: string }[] };
});

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    mediaSizes: { data: [], status: "idle", error: null },
    streams: {
      data: [] as { name: string; url: string }[],
      status: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    /**
     * doGetMediaSizes
     */
    builder.addCase(doGetMediaSizes.pending, (state, action) => {
      state.mediaSizes.status = "pending";
      state.mediaSizes.error = null;
    });
    builder.addCase(doGetMediaSizes.fulfilled, (state, action) => {
      state.mediaSizes.status = "fulfilled";
      state.mediaSizes.error = null;

      state.mediaSizes.data = action.payload;
    });
    builder.addCase(doGetMediaSizes.rejected, (state, action) => {
      state.mediaSizes.status = "rejected";
      state.mediaSizes.error = action.error.message;
    });
    /**
     * doGetStreams
     */
    builder.addCase(doGetStreams.pending, (state, action) => {
      state.streams.status = "pending";
      state.streams.error = null;
    });
    builder.addCase(doGetStreams.fulfilled, (state, action) => {
      state.streams.status = "fulfilled";
      state.streams.error = null;

      state.streams.data = action.payload.streams;
    });
    builder.addCase(doGetStreams.rejected, (state, action) => {
      state.streams.status = "rejected";
      state.streams.error = action.error.message;
    });
  },
});

export const {} = videoSlice.actions;
export const { reducer } = videoSlice;

export const useCams = () =>
  useSelector((state) => {
    const streams = state.video.streams.data;

    const cams = groupBy(
      (s) => s.name,
      streams.map((s) => {
        const [name, size = "1080"] = s.name.split("_");
        return { ...s, name, size };
      })
    );

    const camsWithSizes = mapObjIndexed((cam) => {
      return cam.reduce((acc, s) => {
        return { ...acc, [s.size]: dissoc("size", s) };
      }, {} as { [key: string]: { name: string; url: string; size: string } });
    }, cams);

    return camsWithSizes;
  });
