import { useEffect, useRef, FunctionComponent } from "react";

interface OutsideProps {
  onClick(event: MouseEvent | undefined): any;
  delay?: number;
}

export const Outside: FunctionComponent<OutsideProps> = ({
  delay = 0,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let to;

    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        if (delay > 0) {
          to = setTimeout(() => props.onClick(event), delay);
        } else {
          props.onClick(event);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (to) {
        clearTimeout(to);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, props.onClick]);

  return (
    <div className="inline-block" ref={ref}>
      {props.children}
    </div>
  );
};
