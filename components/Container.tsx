import { css } from "linaria";
import { styled } from "linaria/react";
import { StyleFC } from "@/types/component";

export const Container = styled((({
  className,
  style,
  children,
  noPad = false,
}) => {
  return (
    <div className={[className, { [styleNoPad]: noPad }] as any} style={style}>
      {children}
    </div>
  );
}) as StyleFC<{ noPad?: boolean }>)`
  @apply mx-auto w-full max-w-screen-xs;
  @apply px-2;
`;

var styleNoPad = css`
  @apply px-0;
`;
