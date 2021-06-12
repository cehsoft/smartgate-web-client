import { FC, ComponentType, useEffect, useMemo, useState } from "react";
import { MediaSourceStream } from "@/libs/media-source";

const RESET_TIME = 30 * 60 * 60 * 1000; // 30 minutes

export const HocCameraWebsocket: FC<{
  wsURL: string;
  compVideo: NonNullable<
    ComponentType<{
      objectURL: string;
    }>
  >;
}> = ({ wsURL, compVideo: Video }) => {
  const [resetTimes, reset] = useState(0);

  const { mss, objectURL } = useMemo(() => {
    const mss = new MediaSourceStream(undefined, (err) => {
      console.log(err);
      console.log("on error occurred media-source reset...");
      reset(resetTimes + 1);
    });

    return { mss, objectURL: window.URL.createObjectURL(mss.mediaSource) };
  }, [resetTimes]);

  useEffect(() => {
    const ws = new WebSocket(wsURL);
    ws.binaryType = "arraybuffer";

    ws.onopen = function () {
      console.log("media-source reset:", resetTimes);
    };

    ws.onmessage = function ({ data }: { data: ArrayBuffer }) {
      const init = new Uint8Array(data);
      if (init[0] !== 9) {
        mss.pushPacket(data);
      }
    };
  }, [mss]);

  useEffect(() => {
    const tout = setTimeout(() => {
      reset(resetTimes + 1);
    }, RESET_TIME);

    return () => clearTimeout(tout);
  }, [resetTimes]);

  return <Video objectURL={objectURL} />;
};

export default HocCameraWebsocket;
