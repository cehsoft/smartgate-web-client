import { FC, useState } from "react";
import { Recording16 } from "@carbon/icons-react";
import {
  SideNav as BXSideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react";

export const SideNav: FC = ({ children }) => {
  const [open, setOpen] = useState(false);

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
          <SideNavMenuItem aria-current="page" href="#">
            Kiểm soát cổng
          </SideNavMenuItem>
          <SideNavMenuItem href="#">Lịch sử (Sắp có)</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Recording16} title="Cổng Ra - 1" large>
          {/* <SideNavMenuItem href="#">Phân giải 360</SideNavMenuItem>
          <SideNavMenuItem href="#">Phân giải 720</SideNavMenuItem>
          <SideNavMenuItem href="#">Phân giải 1080</SideNavMenuItem> */}
        </SideNavMenu>
      </SideNavItems>
    </BXSideNav>
  );
};
