import { FC, useEffect, useRef } from "react";

export const WebRTCPlayer: FC<{
  signalingPath?: string;
  camId: string;
  controls: boolean;
}> = ({
  signalingPath = process.env.NEXT_PUBLIC_WEBRTC_SIGNAL,
  camId,
  controls = true,
}) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (playerRef.current != null) {
      const peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: process.env.NEXT_PUBLIC_TURN_URL,
            username: process.env.NEXT_PUBLIC_TURN_USERNAME,
            credential: process.env.NEXT_PUBLIC_TURN_PASSWORD,
            credentialType: "password",
          },
        ],
      });

      peer.addTransceiver("video");
      peer.oniceconnectionstatechange = () =>
        console.log(peer.iceConnectionState);
      peer.ontrack = function (event) {
        if (event.track.kind === "video") {
          playerRef.current.srcObject = event.streams[0];
        }
      };

      peer
        .createOffer({ iceRestart: false })
        .then((offer) => {
          peer.setLocalDescription(offer);

          return fetch(signalingPath, {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ offer, camId }),
          });
        })
        .then((res) => res.json())
        .then((res) => peer.setRemoteDescription(res))
        .catch((err) => {
          console.warn(err);
        });

      return () => peer.close();
    }
  }, [playerRef, camId]);

  return (
    <video
      ref={playerRef}
      width="100%"
      autoPlay
      controls={controls}
      muted
    ></video>
  );
};

export default WebRTCPlayer;
