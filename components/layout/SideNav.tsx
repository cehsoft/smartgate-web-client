import { FC, useState } from "react";
import { Recording16 } from "@carbon/icons-react";
import { useRouter } from "next/router";
import {
  SideNav as BXSideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react";

export const SideNav: FC = ({ children }) => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  return (
    // <BXSideNav
    //   aria-label="Side navigation"
    //   onToggle={(event, val) => {
    //     setOpen(val);
    //   }}
    //   isRail
    // >
    <BXSideNav aria-label="Side navigation" isRail isFixedNav expanded={true}>
      <SideNavItems>
        <SideNavMenu
          // aria-current="page"
          renderIcon={Recording16}
          title="Cổng Vào - 1"
          large
        >
          <SideNavMenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push("/live-stream/4");
            }}
            href="/live-stream/4"
          >
            Kiểm soát cổng
          </SideNavMenuItem>
          <SideNavMenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push("/ocr-history/4");
            }}
            href="/ocr-history/4"
          >
            Lịch sử
          </SideNavMenuItem>
        </SideNavMenu>
        {/* <SideNavMenu renderIcon={Recording16} title="Cổng Ra - 1" large> */}
        {/* <SideNavMenuItem href="#">Phân giải 360</SideNavMenuItem>
          <SideNavMenuItem href="#">Phân giải 720</SideNavMenuItem>
          <SideNavMenuItem href="#">Phân giải 1080</SideNavMenuItem> */}
        {/* </SideNavMenu> */}
      </SideNavItems>
    </BXSideNav>
  );
};
