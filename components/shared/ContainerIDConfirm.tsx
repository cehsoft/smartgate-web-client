import { forwardRef } from "react";
import { StyleFC } from "@/types/component";
import { css } from "linaria";
import { useEffect, useState } from "react";
import { TextInput, Button } from "carbon-components-react";

interface InputProps {
  containerId?: string;
  suggestId?: number;
  score?: number;
  onDiscard?(suggestId: number): void;
}

export const ContainerIDConfirm: StyleFC<InputProps> = forwardRef(
  (
    { style, className, containerId = "", suggestId, score, onDiscard },
    ref
  ) => {
    const [conId, setId] = useState(containerId);

    return (
      <div className={[className] as any} style={style}>
        <TextInput
          className={["mb-2", clsInput] as any}
          labelText={
            score !== undefined
              ? `Độ chính xác: ${Math.round(score * 100)}%`
              : ""
          }
          id={suggestId ? `${containerId}-${suggestId}` : containerId}
          placeholder="Hãy nhập số container"
          value={conId}
          onChange={(e) => setId(e.target.value)}
        />
        {onDiscard && (
          <Button
            className="ml-2"
            onClick={() => {
              onDiscard(suggestId);
            }}
            kind="secondary"
            size="sm"
          >
            Xoá
          </Button>
        )}
      </div>
    );
  }
);

var clsInput = css`
  &.bx--text-input {
    @apply bg-white;
  }
`;
