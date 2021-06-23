import { forwardRef } from "react";
import { StyleFC } from "@/types/component";
import { css } from "linaria";
import { useEffect, useState } from "react";
import { TextInput, Button } from "carbon-components-react";

interface InputProps {
  containerId: string;
  cacheId: number;
  score: number;

  onConfirm(cacheId: number, containerId: string): void;
}

export const ContainerIDConfirm: StyleFC<InputProps> = forwardRef(
  ({ style, className, containerId, cacheId, score, onConfirm }, ref) => {
    const [id, setId] = useState(containerId);

    return (
      <div className={[className, clsBase] as any} style={style}>
        <TextInput
          className="mb-2"
          labelText={`Mã gợi ý: ${Math.round(score * 100)}%`}
          id={`${containerId}-${cacheId}`}
          defaultValue={containerId}
          onChange={(e) => setId(e.target.value)}
        />
        <Button
          onClick={() => {
            onConfirm(cacheId, id);
          }}
          size="sm"
        >
          Chọn
        </Button>
      </div>
    );
  }
);

var clsBase = css``;
