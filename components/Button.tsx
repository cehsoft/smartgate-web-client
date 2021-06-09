import { forwardRef } from "react";
import { StyleFC } from "@/types/component";
import { css } from "linaria";
import { Button as RButton, ButtonProps as RButtonProps } from "reakit";

type Kinds = "normal" | "primary" | undefined;
type Variants = "normal" | "outline" | undefined;
type Sizes = "small" | "normal" | undefined;

interface ButtonProps {
  kind?: Kinds;
  variant?: Variants;
  size?: Sizes;
}

export const Button: StyleFC<ButtonProps & RButtonProps> = forwardRef(
  (
    {
      children,
      kind = "normal",
      variant = "normal",
      size = "normal",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <RButton
        ref={ref}
        {...props}
        onMouseDown={(evt) => {
          evt.preventDefault();

          if (props.onMouseDown) {
            props.onMouseDown(evt);
          }
        }}
        className={
          [
            className,
            btnBase,
            { [btnSizeSmall]: size === "small" },
            { [btnKindPrimary]: kind === "primary" },
            { [btnVariantOutline]: variant === "outline" },
          ] as any
        }
      >
        {children}
      </RButton>
    );
  }
);

const btnBase = css`
  @apply inline-block py-2 px-4;
  @apply shadow-light font-semibold;
  @apply border-2 border-transparent;
  @apply focus:outline-none focus:shadow-strong;
  @apply hover:bg-opacity-90 hover:shadow-strong;

  min-width: 100px;
`;

const btnSizeSmall = css`
  @apply py-1 px-2;
  @apply text-sm;

  min-width: auto;
`;

const btnVariantOutline = css`
  @apply border-solid border-black border-2;
  @apply hover:bg-gray-100;
  @apply focus:border-opacity-90 focus:bg-gray-200;
`;

const btnKindPrimary = css`
  @apply bg-primary-default text-white;
  @apply focus:bg-primary-dark;

  &.${btnVariantOutline} {
    @apply bg-transparent hover:bg-blue-50 border-primary-default text-primary-default;
    @apply focus:border-primary-dark focus:text-primary-dark focus:bg-blue-100;
  }
`;
