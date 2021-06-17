import { css } from "linaria";
import dynamic from "next/dynamic";

import { Page } from "@/components/layout/Page";

import { grpc } from "@improbable-eng/grpc-web";
import { ReqEmpty, ResMLResult } from "@/libs/proto/service_pb";
import { MyGRPC } from "@/libs/proto/service_pb_service";
import { useEffect, useState } from "react";

const WebRTCPlayer = dynamic(() => import("@/components/shared/WebRTCPlayer"), {
  ssr: false,
});

const classVideo = css`
  @apply block;
`;

export const Home = () => {
  const [containerId, setContainerId] = useState("");

  useEffect(() => {
    grpc.invoke(MyGRPC.pullMLResult, {
      transport: grpc.WebsocketTransport(),
      request: new ReqEmpty(),
      host: "http://localhost:3000",
      onMessage: (message: ResMLResult) => {
        const result = message.toObject();
        setContainerId(result.containerid);
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

  return (
    <Page>
      <div className="p-4 mb-4 text-white bg-black">
        <span className="font-semibold">Đã nhận dạng mã số:</span> {containerId}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map(({ name, position }) => (
          <div key={name} className={classVideo}>
            <div className="bg-white p-4 font-semibold flex flex-row justify-between">
              <span>{name}</span>
              <span>{position}</span>
            </div>
            <WebRTCPlayer
              signalingPath="http://localhost:3030/signaling"
              camId={name}
            />
          </div>
        ))}
      </div>
      <div></div>
    </Page>
  );
};

export default Home;
