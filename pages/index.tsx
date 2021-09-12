import { css } from "linaria";

import { useRequiredAuth } from "@/libs/hooks";

import { Page } from "@/components/layout/Page";

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
