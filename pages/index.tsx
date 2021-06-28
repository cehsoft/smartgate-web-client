import { css } from "linaria";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sort, descend, prop } from "ramda";
import { RowDelete16 } from "@carbon/icons-react";

import { useRequiredAuth } from "@/libs/hooks";
import { useSelector, useDispatch } from "@/store/hooks";
import { doConfirm, doPullMLResult, reset } from "@/store/slices/container";

import { Page } from "@/components/layout/Page";
import { ContainerIDConfirm } from "@/components/shared/ContainerIDConfirm";

const WebRTCPlayer = dynamic(() => import("@/components/shared/WebRTCPlayer"), {
  ssr: false,
});

export const Home = () => {
  useRequiredAuth();

  const dispatch = useDispatch();
  const suggests = useSelector((state) =>
    sort(descend(prop("score")), state.container.trackingResults)
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
    dispatch(doPullMLResult());
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
                    <WebRTCPlayer controls={false} camId={name} />
                  </div>
                ))}
            </div>
            <div className="p-4 mt-4 text-white bg-black">
              <span className="font-semibold">Nhập thủ công</span>
            </div>
            <div className="p-4 bg-gray-200">
              <span>Trong trường hợp không thể nhập tự động</span>
              <ContainerIDConfirm
                className="mb-2 mt-4"
                onConfirm={(suggestId, id) => {
                  dispatch(
                    doConfirm({
                      suggestId: undefined,
                      containerId: id,
                    })
                  );
                }}
              />
            </div>
            <div className="p-4 mt-4 text-white bg-black flex flex-row justify-between items-center">
              <span className="font-semibold">Nhập tự động</span>
              <span
                className="flex flex-row justify-between items-center cursor-pointer"
                onClick={() => {
                  dispatch(reset());
                }}
              >
                <span className="inline-block text-xs mr-1">Làm mới</span>{" "}
                <RowDelete16 />
              </span>
            </div>
            <div className="p-4 bg-gray-200">
              {suggests.length === 0 && <span>Đang chờ lượt xe vào</span>}
              {suggests.slice(0, 3).map((s, idx) => (
                <div className="flex flex-row">
                  <img
                    className="w-1/4 h-28 object-contain object-top"
                    src={
                      process.env.NEXT_PUBLIC_MINIO +
                      s.imageurl.split("/").slice(4).join("/")
                    }
                    alt=""
                  />
                  <ContainerIDConfirm
                    className="w-3/4 mb-2 ml-4"
                    key={idx}
                    suggestId={s.suggestid}
                    containerId={s.containerid}
                    score={s.score}
                    onConfirm={(suggestId, id) => {
                      dispatch(
                        doConfirm({
                          suggestId,
                          containerId: id,
                        })
                      );
                    }}
                  />
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
              <WebRTCPlayer controls={true} camId={selectedCam.name} />
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
