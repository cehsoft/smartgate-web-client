import { css } from "linaria";
import { Content } from "carbon-components-react";

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
  return (
    <Content className={classPageContent}>
      <div className="p-8">{children}</div>
    </Content>
  );
};
