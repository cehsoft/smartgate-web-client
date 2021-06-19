import { css } from "linaria";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { grpc } from "@improbable-eng/grpc-web";
import { TextInput, Button } from "carbon-components-react";
import { sortBy, prop } from "ramda";

import { useSelector, useDispatch } from "@/store/hooks";
import { addNewResult, confirm } from "@/store/slices/container";
import { MyGRPC } from "@/libs/proto/service_pb_service";
import { ReqEmpty, ResMLResult } from "@/libs/proto/service_pb";

import { Page } from "@/components/layout/Page";

const WebRTCPlayer = dynamic(() => import("@/components/shared/WebRTCPlayer"), {
  ssr: false,
});

export const Home = () => {
  const dispatch = useDispatch();
  const suggests = useSelector((state) =>
    sortBy(prop("score"), state.container.trackingResults)
  );

  const cameras = [
    {
      name: "c242",
      position: "Trước",
    },
    {
      name: "c240",
      position: "Sau",
    },
    {
      name: "c241",
      position: "Trên",
    },
    {
      name: "c238",
      position: "Phải",
    },
    {
      name: "c239",
      position: "Trái",
    },
  ];

  useEffect(() => {
    grpc.invoke(MyGRPC.pullMLResult, {
      transport: grpc.WebsocketTransport(),
      request: new ReqEmpty(),
      host: "http://10.10.14.60:3000",
      onMessage: (message: ResMLResult) => {
        const result = message.toObject();
        dispatch(addNewResult(result));
      },
      onEnd: (code, msg, trailers) => {
        if (code == grpc.Code.OK) {
          console.log("all ok");
        } else {
          console.log("hit an error", code, msg, trailers);
        }
      },
    });
  }, []);

  const [selectedCam, setCam] = useState(cameras[0]);

  return (
    <Page>
      <div className="w-full flex flex-row">
        <div className="w-2/6">
          <div>
            <div className={clsCameraSelections}>
              {cameras
                .filter((cam) => cam.name != selectedCam.name)
                .map(({ name, position }) => (
                  <div
                    key={name}
                    className={clsVideoItem}
                    onClick={() => setCam({ name, position })}
                  >
                    <div className="bg-white p-2 font-semibold flex flex-row justify-between">
                      <span>{position}</span>
                    </div>
                    <WebRTCPlayer
                      signalingPath="http://10.10.14.60:3030/signaling"
                      controls={false}
                      camId={name}
                    />
                  </div>
                ))}
            </div>
            <div className="p-4 mt-4 text-white bg-black">
              <span className="font-semibold">Các mã gợi ý từ hệ thống</span>
            </div>
            <div className="p-4 bg-gray-200">
              {suggests.length === 0 && <span>Chưa có gợi ý mới</span>}
              {suggests.slice(0, 3).map((s) => (
                <div
                  key={`${s.containerid}-${s.cachedid}`}
                  className={clsSuggestItem}
                >
                  <TextInput
                    className="mb-2"
                    labelText="Mã gợi ý: 90%"
                    id={`${s.containerid}-${s.cachedid}`}
                    defaultValue={s.containerid}
                  />
                  <Button onClick={() => dispatch(confirm())} size="sm">
                    Chọn
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-4/6">
          <div className="mx-4">
            <div className={clsVideo}>
              <div className="bg-white p-4 font-semibold flex flex-row justify-between">
                <span>{selectedCam.position}</span>
                <span>{selectedCam.name}</span>
              </div>
              <WebRTCPlayer
                signalingPath="http://10.10.14.60:3030/signaling"
                controls={true}
                camId={selectedCam.name}
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </Page>
  );
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
