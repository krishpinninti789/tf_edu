"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export default function Page() {
  return (
    <>
      <CldVideoPlayer width="1920" height="1080" src="4_mdnbm2" />
    </>
  );
}
