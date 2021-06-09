import { css } from "linaria";
import dynamic from "next/dynamic";
import { Page } from "@/components/layout/Page";

const HocCameraWebsocket = dynamic(
  () => import("@/components/shared/HocCameraWebsocket"),
  { ssr: false }
);

const classVideo = css`
  @apply block;
`;

export const Home = () => {
  const cameras = [
    {
      name: "CAM_242",
      position: "Trước",
    },
    {
      name: "CAM_240",
      position: "Sau",
    },
    {
      name: "CAM_241",
      position: "Trên",
    },
    {
      name: "CAM_238",
      position: "Phải",
    },
    {
      name: "CAM_239",
      position: "Trái",
    },
  ];

  return (
    <Page>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map(({ name, position }) => (
          <HocCameraWebsocket
            key={name}
            wsURL={`wss://webrtc-dev.dtap.cloud/ws/live?suuid=${name}`}
            compVideo={({ objectURL }) => (
              <div className={classVideo}>
                <div className="bg-white p-4 font-semibold flex flex-row justify-between">
                  <span>{name}</span>
                  <span>{position}</span>
                </div>
                <video
                  className="w-full"
                  src={objectURL}
                  controls
                  autoPlay
                  muted
                ></video>
              </div>
            )}
          />
        ))}
      </div>
    </Page>
  );
};

export default Home;
