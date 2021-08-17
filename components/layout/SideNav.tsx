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
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <BXSideNav
      aria-label="Side navigation"
      onToggle={(event, val) => {
        setOpen(val);
      }}
      isRail
    >
      {/* <BXSideNav aria-label="Side navigation" isRail isFixedNav expanded={true}> */}
      <SideNavItems isSideNavExpanded={open}>
        <SideNavMenu
          aria-current="page"
          renderIcon={Recording16}
          title="Cổng Vào - 1"
          large
        >
          <SideNavMenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
            href="/"
          >
            Kiểm soát cổng
          </SideNavMenuItem>
          <SideNavMenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push("/history");
            }}
            href="/history"
          >
            Lịch sử nhận dạng
          </SideNavMenuItem>
          <SideNavMenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push("/tracking");
            }}
            href="/tracking"
          >
            Lịch sử ghi nhận
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
