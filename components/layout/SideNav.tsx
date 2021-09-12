import { FC, useEffect, useState } from "react";
import { Recording16 } from "@carbon/icons-react";
import { useRouter } from "next/router";
import {
  SideNav as BXSideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react";
import { useSelector } from "@/store/hooks";

export const SideNav: FC = ({ children }) => {
  const router = useRouter();
  const lanes = useSelector((state) => state.setting.lanes);

  return (
    <BXSideNav aria-label="Side navigation" isRail isFixedNav expanded={true}>
      <SideNavItems>
        {lanes.map((lane) => (
          <SideNavMenu
            key={lane.id}
            // aria-current="page"
            renderIcon={Recording16}
            title={`${lane.name} ${lane.gatename}`}
            large
          >
            <SideNavMenuItem
              onClick={(e) => {
                e.preventDefault();
                router.push(`/live-stream/${lane.id}`);
              }}
              href={`/live-stream/${lane.id}`}
            >
              Kiểm soát cổng
            </SideNavMenuItem>
            <SideNavMenuItem
              onClick={(e) => {
                e.preventDefault();
                router.push(`/ocr-history/${lane.id}`);
              }}
              href={`/ocr-history/${lane.id}`}
            >
              Lịch sử
            </SideNavMenuItem>
          </SideNavMenu>
        ))}
      </SideNavItems>
    </BXSideNav>
  );
};
