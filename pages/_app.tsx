import "./global-styles.css";
import "carbon-components/css/carbon-components.css";
import { useMemo } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import { loadStore } from "@/store/index";

import { LayoutMain } from "@/components/layout/LayoutMain";

function MyApp({ Component, pageProps }: AppProps) {
  // console.log("pageProps.snapshotState", pageProps.snapshotState);

  const store = useMemo(
    () => loadStore(pageProps.preloadedState),
    [pageProps.preloadedState]
  );

  return (
    <Provider store={store}>
      <LayoutMain>
        <Component {...pageProps} />
      </LayoutMain>
    </Provider>
  );
}

export default MyApp;
