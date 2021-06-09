import { css } from "linaria";
import { FC } from "react";

import { Header } from "@/components/layout/Header";
import { SideNav } from "@/components/layout/SideNav";

const classLayout = css`
  min-height: calc(100vh - 3rem);
`;

export const LayoutMain: FC = ({ children }) => {
  return (
    <div className={classLayout}>
      <Header />
      <SideNav />
      {children}
    </div>
  );
};
