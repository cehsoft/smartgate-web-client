import { css } from "linaria";
import { useEffect, useState } from "react";
import { sort, descend, prop } from "ramda";

import { useSelector, useDispatch } from "@/store/hooks";
import { doListTracking } from "@/store/slices/container";

import { Page } from "@/components/layout/Page";

export const History = () => {
  const dispatch = useDispatch();
  const trackings = useSelector((state) => state.container.trackings);

  useEffect(() => {
    dispatch(doListTracking());
  }, []);

  return <Page>{JSON.stringify(trackings)}</Page>;
};

export default History;
