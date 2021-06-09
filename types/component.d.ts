import { FC, CSSProperties } from "react";

declare type StyleFC<T = {}> = FC<
  T & { className?: string; style?: CSSProperties }
>;
