import { css } from "linaria";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sort, descend, prop } from "ramda";
import { RowDelete16 } from "@carbon/icons-react";
import { Modal } from "carbon-components-react";
import { useRouter } from "next/router";
import { Button } from "carbon-components-react";

import { useRequiredAuth } from "@/libs/hooks";
import { useSelector, useDispatch } from "@/store/hooks";
import {
  // doConfirm,
  doPullMLResult,
  reset,
  discard,
} from "@/store/slices/container";

import { Page } from "@/components/layout/Page";
import { ContainerIDConfirm } from "@/components/shared/ContainerIDConfirm";
import { ResMLResult } from "@/libs/proto/service_pb";

const WebRTCPlayer = dynamic(() => import("@/components/shared/WebRTCPlayer"), {
  ssr: false,
});

export const Home = () => {
  useRequiredAuth();

  const router = useRouter();
  const query = router.query;
  const laneId = parseInt([].concat(query.laneId).shift());

  const dispatch = useDispatch();
  const suggests = useSelector((state) =>
    sort(descend(prop("score")), state.container.trackingResults)
  );

  const [modalSuggest, setModalSuggest] = useState<ResMLResult.AsObject>(null);
  const [hasModal, setModal] = useState(false);

  // snp
  // const cameras = [
  //   {
  //     name: "cam214",
  //     position: "Trước",
  //   },
  //   {
  //     name: "cam209",
  //     position: "Sau",
  //   },
  //   {
  //     name: "cam215",
  //     position: "Trên",
  //   },
  //   {
  //     name: "cam210",
  //     position: "Phải",
  //   },
  //   {
  //     name: "cam212",
  //     position: "Trái",
  //   },
  //   {
  //     name: "cam207",
  //     position: "Xe",
  //   },
  //   {
  //     name: "cam208",
  //     position: "Romooc",
  //   },
  // ];

  // spitc
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
    {
      name: "c201",
      position: "Xe",
    },
    {
      name: "c202",
      position: "Romooc",
    },
  ];

  useEffect(() => {
    dispatch(doPullMLResult({ laneId }));
  }, []);

  const [selectedCam, setCam] = useState(cameras[0]);

  return (
    <Page>
      {modalSuggest && (
        <Modal
          open={hasModal}
          hasForm
          modalLabel={`Độ chính xác: ${Math.round(modalSuggest.score * 100)}%`}
          modalHeading={modalSuggest.containerid}
          onRequestClose={() => {
            setModal(false);
          }}
          secondaryButtonText="Đóng"
        >
          <img
            className="w-full max-h-56 object-contain object-top"
            src={modalSuggest.imageurl}
          />
        </Modal>
      )}
      <div className="w-full flex flex-row">
        <div className="w-5/12">
          <div>
            <div className="p-4 text-white bg-black flex flex-row justify-between items-center">
              <span className="font-semibold">Lượt xe</span>
              {suggests.length > 0 && (
                <span
                  className="flex flex-row justify-between items-center cursor-pointer"
                  onClick={() => {
                    dispatch(reset());
                  }}
                >
                  <span className="inline-block text-xs mr-1">
                    Làm mới phiên
                  </span>{" "}
                  <RowDelete16 />
                </span>
              )}
            </div>
            <div className="p-4 bg-gray-200">
              {suggests.length === 0 && <span>Đang chờ lượt xe vào</span>}
              {suggests.slice(0, 3).map((s, idx) => (
                <div
                  key={`${s.suggestid}-${idx}`}
                  className="flex flex-row mb-2"
                >
                  <div className="w-1/4 h-28">
                    <img
                      className="w-full max-h-28 object-contain object-top cursor-pointer"
                      src={
                        process.env.NEXT_PUBLIC_MINIO +
                        s.imageurl.split("/").slice(4).join("/")
                      }
                      onClick={() => {
                        setModalSuggest({
                          ...s,
                          imageurl:
                            process.env.NEXT_PUBLIC_MINIO +
                            s.imageurl.split("/").slice(4).join("/"),
                        });
                        setModal(true);
                      }}
                      alt=""
                    />
                  </div>
                  <ContainerIDConfirm
                    className="w-3/4 ml-4"
                    suggestId={s.suggestid}
                    containerId={s.containerid}
                    score={s.score}
                    onDiscard={(suggestId) => {
                      dispatch(discard({ suggestId }));
                    }}
                  />
                </div>
              ))}
              {suggests.length > 3 ? (
                <div className="text-center text-xs text-gray-400">
                  Có {suggests.length - 3} kết quả kém chính xác hơn cho phiên
                  này
                </div>
              ) : (
                suggests.length > 0 && (
                  <div className="text-center text-xs text-gray-400">
                    Nhấp vào ảnh để xem rõ hơn
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="w-7/12">
          <div className="mx-4">
            <div className={clsVideo}>
              <div className="bg-white p-4 font-semibold flex flex-row justify-between">
                <span>Vị trí cam: {selectedCam.position}</span>
                <span>Cam số: {selectedCam.name}</span>
              </div>
              <WebRTCPlayer controls={true} camId={selectedCam.name} />
            </div>
          </div>
          <div className={clsCameraSelections}>
            {cameras
              .filter((cam) => cam.name != selectedCam.name)
              .map(({ name, position }) => (
                <Button
                  size="sm"
                  key={name}
                  className={clsVideoItem}
                  onClick={() => setCam({ name, position })}
                >
                  {position}
                </Button>
              ))}
          </div>
        </div>
      </div>
      <div></div>
    </Page>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;

var clsVideoItem = css`
  @apply inline-block cursor-pointer w-1/5 mb-2 mr-2;
`;

var clsVideo = css`
  @apply block mb-4;
`;

var clsCameraSelections = css`
  @apply mx-4 flex flex-row items-start flex-wrap;
`;

var clsSuggestItem = css`
  @apply mb-4;
`;
