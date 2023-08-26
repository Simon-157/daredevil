import Navbar from "../navbar/Navbar";
import { ReactNode } from "react";
import AppFrameStyles from "./AppFrame.module.css";

type AppFrameProps = {
  children: ReactNode;
};

export const AppFrame = ({ children }: AppFrameProps) => {
  return (
    <div className={AppFrameStyles.frame}>
      <div className={AppFrameStyles.navbar_frame_container}>
        <Navbar />
      </div>
      <div className={AppFrameStyles.loaded_routes_frame_container}>
        {children}
      </div>
    </div>
  );
};
