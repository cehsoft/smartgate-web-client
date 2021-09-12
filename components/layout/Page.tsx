import { css } from "linaria";
import { Content } from "carbon-components-react";

import { useEffect } from "react";
import { useDispatch } from "@/store/hooks";
import { doListOCRs } from "@/store/slices/container";
import { doListLanes } from "@/store/slices/setting";

const classPageContent = css`
  &.bx--content {
    @apply p-0 fixed overflow-scroll;
    height: calc(100% - 3rem);
    width: calc(100% - 3rem);
  }

  .bx--side-nav.bx--side-nav--expanded ~ &.bx--content {
    width: calc(100% - 16rem);
  }
`;

export const Page = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doListLanes());
  }, []);

  return (
    <Content className={classPageContent}>
      <div className="p-8">{children}</div>
    </Content>
  );
};
