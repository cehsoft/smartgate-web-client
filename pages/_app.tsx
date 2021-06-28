import "./global-styles.css";
import "carbon-components/css/carbon-components.css";
import { useMemo } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import { loadStore } from "@/store/index";

import { LayoutMain } from "@/components/layout/LayoutMain";
import { LayoutLogin } from "@/components/layout/LayoutLogin";

function MyApp({ Component, pageProps, router }: AppProps) {
  // console.log("pageProps.snapshotState", pageProps.snapshotState);
  console.log(router.asPath);

  const store = useMemo(
    () => loadStore(pageProps.preloadedState),
    [pageProps.preloadedState]
  );

  return (
    <Provider store={store}>
      {router.asPath !== "/login" ? (
        <LayoutMain>
          <Component {...pageProps} />
        </LayoutMain>
      ) : (
        <LayoutLogin>
          <Component {...pageProps} />
        </LayoutLogin>
      )}
    </Provider>
  );
}

export default MyApp;
