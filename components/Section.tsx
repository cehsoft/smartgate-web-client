import { css } from "linaria";
import { styled } from "linaria/react";
import { StyleFC } from "@/types/component";

export const Section = styled((({ className, style, children }) => {
  return (
    <div className={className as any} style={style}>
      {children}
    </div>
  );
}) as StyleFC<any>)`
  @apply my-2;
`;
