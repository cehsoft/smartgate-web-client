import { FC, useEffect, useRef } from "react";

export const WebRTCPlayer: FC<{
  signalingPath: string;
  camId: string;
}> = ({ signalingPath, camId }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (playerRef.current != null) {
      const peer = new RTCPeerConnection();

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
        .catch(alert);
    }
  }, [playerRef]);

  return <video ref={playerRef} width="100%" autoPlay controls muted></video>;
};

export default WebRTCPlayer;
