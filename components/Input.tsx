import { forwardRef } from "react";
import { StyleFC } from "@/types/component";
import { css } from "linaria";
import { Input as RInput, InputProps as RInputProps } from "reakit";

type Kinds = "normal" | "primary" | undefined;
type Variants = "normal" | "outline" | undefined;
type Sizes = "small" | "normal" | undefined;

interface InputProps {}

export const Input: StyleFC<InputProps & RInputProps> = forwardRef(
  ({ children, className, ...props }, ref) => {
    return (
      <RInput ref={ref} {...props} className={[className, inputBase] as any}>
        {children}
      </RInput>
    );
  }
);

var inputBase = css`
  @apply inline-block max-w-xs w-full px-2 py-1;

  @apply border-2 border-gray-200;
  @apply hover:shadow-light hover:border-gray-300;
  @apply focus:outline-none focus:shadow-light focus:border-primary-dark;

  min-width: 100px;
`;
