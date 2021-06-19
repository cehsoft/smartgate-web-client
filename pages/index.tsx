import { css } from "linaria";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { TextInput, Button } from "carbon-components-react";
import { sort, descend, prop } from "ramda";

import { useSelector, useDispatch } from "@/store/hooks";
import { doConfirm, doPullMLResult } from "@/store/slices/container";

import { Page } from "@/components/layout/Page";

const WebRTCPlayer = dynamic(() => import("@/components/shared/WebRTCPlayer"), {
  ssr: false,
});

export const Home = () => {
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
                    labelText={`Mã gợi ý: ${Math.round(s.score * 100)}%`}
                    id={`${s.containerid}-${s.cachedid}`}
                    defaultValue={s.containerid}
                  />
                  <Button
                    onClick={() =>
                      dispatch(
                        doConfirm({
                          cacheId: s.cachedid,
                          containerId: s.containerid,
                        })
                      )
                    }
                    size="sm"
                  >
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
