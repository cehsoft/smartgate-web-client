import { mergeDeepRight } from "ramda";
import { configureStore } from "@reduxjs/toolkit";

import { reducer as session } from "@/store/slices/session";
import { reducer as load } from "@/store/slices/load";
import { reducer as container } from "@/store/slices/container";
import { reducer as setting } from "@/store/slices/setting";

const reducer = {
  session,
  load,
  container,
  setting,
};

export let store = configureStore({
  reducer,
});

export const loadStore = (
  preloadedState: RootState | undefined = undefined
) => {
  if (typeof window === "undefined") {
    // server always get new store instances
    return configureStore({
      reducer,
      preloadedState,
    });
  }

  if (!preloadedState) {
    return store;
  }

  const currentState = store.getState();
  const mergedState = mergeDeepRight(currentState, preloadedState);

  store = configureStore({
    reducer,
    preloadedState: mergedState as any,
  });

  return store;
};

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
