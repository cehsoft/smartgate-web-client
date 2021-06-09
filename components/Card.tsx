import { css } from "linaria";
import { styled } from "linaria/react";
import { StyleFC } from "@/types/component";

const classHeader = css``;
const classBody = css``;
const classFooter = css``;

export const Card = styled((({ className, style, children }) => {
  return (
    <div className={[className] as any} style={style}>
      <div className={classHeader}></div>
      <div className={classBody}></div>
      <div className={classFooter}></div>
    </div>
  );
}) as StyleFC<{}>)`
  @apply mx-auto w-full max-w-screen-xs;
  @apply px-2;
`;
