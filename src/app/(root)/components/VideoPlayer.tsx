"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const VideoPlayer = ({ srcUrl }: any) => {
  // console.log(srcUrl);

  return (
    <div className="flex  justify-center p-4">
      <CldVideoPlayer
        key={srcUrl}
        // id={`video-${srcUrl}`}
        width="1920"
        height="1080"
        controls
        loop
        src={srcUrl}
      />
    </div>
  );
};

export default VideoPlayer;
