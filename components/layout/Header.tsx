import { css } from "linaria";
import { Search20 } from "@carbon/icons-react";
import {
  Header as BXHeader,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "carbon-components-react";
import { FC } from "react";

const classHeader = css`
  &.bx--header__name {
    @apply text-lg;

    .bx--header__name--prefix {
      @apply mr-2;
    }
  }
`;

const classHeaderNav = css`
  @apply block;

  .bx--header__menu-item {
    @apply font-bold;
  }
`;

export const Header: FC = ({ children }) => {
  return (
    <BXHeader aria-label="SPITC Platform Name">
      <HeaderName className={classHeader} href="#" prefix="SPITC">
        Bảng Điều Khiển
      </HeaderName>
      <HeaderNavigation
        className={classHeaderNav}
        aria-label="SPITC Navigation"
      >
        <HeaderMenuItem href="#">Quản lý</HeaderMenuItem>
        <HeaderMenuItem href="#">Thiết lập</HeaderMenuItem>
        <HeaderMenuItem href="#">Hỗ trợ</HeaderMenuItem>
        {/* <HeaderMenuItem href="#">Cổng 2</HeaderMenuItem>
              <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
              </HeaderMenu> */}
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Search"
          // onClick={action("search click")}
        >
          <Search20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </BXHeader>
  );
};
