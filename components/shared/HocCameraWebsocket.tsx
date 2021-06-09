import { FC, ComponentType, useEffect, useMemo } from "react";
import { MediaSourceStream } from "@/libs/media-source";

export const HocCameraWebsocket: FC<{
  wsURL: string;
  compVideo: NonNullable<
    ComponentType<{
      objectURL: string;
    }>
  >;
}> = ({ wsURL, compVideo: Video }) => {
  const { mss, objectURL } = useMemo(() => {
    const mss = new MediaSourceStream();
    return { mss, objectURL: window.URL.createObjectURL(mss.mediaSource) };
  }, []);

  useEffect(() => {
    const ws = new WebSocket(wsURL);
    ws.binaryType = "arraybuffer";

    ws.onopen = function () {
      console.log("ws.onopen connected!");
    };

    ws.onmessage = function ({ data }: { data: ArrayBuffer }) {
      const init = new Uint8Array(data);
      if (init[0] !== 9) {
        mss.pushPacket(data);
      }
    };
  }, []);

  return <Video objectURL={objectURL} />;
};

export default HocCameraWebsocket;
