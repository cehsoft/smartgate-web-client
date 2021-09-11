import { css } from "linaria";
import dynamic from "next/dynamic";

import { useRequiredAuth } from "@/libs/hooks";

import { Page } from "@/components/layout/Page";

const WebRTCPlayer = dynamic(() => import("@/components/shared/WebRTCPlayer"), {
  ssr: false,
});

export const Home = () => {
  useRequiredAuth();

  return <Page>{""}</Page>;
};

export default Home;

var clsVideoItem = css`
  @apply inline-block cursor-pointer w-1/4;
`;

var clsVideo = css`
  @apply block mb-4;
`;

var clsCameraSelections = css`
  @apply flex flex-row items-start;
`;

var clsSuggestItem = css`
  @apply mb-4;
`;
