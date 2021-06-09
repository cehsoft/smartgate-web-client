import { ParsedUrlQuery } from "querystring";
import { pick, uniq } from "ramda";

import { AppDispatch, Store } from "@/store/index";
import { Loads, loaded, noResolve } from "@/store/slices/load";

type Resolvers = { [key in Loads]?: (dispatch: AppDispatch) => string[] };

export function queryInitialing(
  query: ParsedUrlQuery,
  store: Store,
  resolvers: Resolvers
) {
  let init = false;
  let picks: string[] = ["load"];

  const [initial]: string[] = [].concat(query ? query["initial"] : []);
  initial &&
    initial.split(",").forEach((initialName: Loads) => {
      if (resolvers[initialName]) {
        const slices = resolvers[initialName](store.dispatch);
        store.dispatch(loaded(initialName));
        picks = picks.concat(slices);
        init = true;
      } else {
        store.dispatch(noResolve(initialName));
        init = true;
      }
    });

  if (init) {
    return {
      initialProps: {
        preloadedState: pick(uniq(picks), store.getState()),
      },
    };
  }

  return {
    initialProps: {},
  };
}
