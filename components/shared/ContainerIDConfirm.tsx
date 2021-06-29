import { forwardRef } from "react";
import { StyleFC } from "@/types/component";
import { css } from "linaria";
import { useEffect, useState } from "react";
import { TextInput, Button } from "carbon-components-react";

interface InputProps {
  containerId?: string;
  suggestId?: number;
  score?: number;

  onConfirm(suggestId: number, containerId: string): void;
}

export const ContainerIDConfirm: StyleFC<InputProps> = forwardRef(
  (
    { style, className, containerId = "", suggestId, score, onConfirm },
    ref
  ) => {
    const [id, setId] = useState(containerId);

    return (
      <div className={[className] as any} style={style}>
        <TextInput
          className={["mb-2", clsInput] as any}
          labelText={score ? `Độ chính xác: ${Math.round(score * 100)}%` : ""}
          id={suggestId ? `${containerId}-${suggestId}` : containerId}
          placeholder="Hãy nhập số container"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Button
          onClick={() => {
            onConfirm(suggestId, id);
            setId("");
          }}
          size="sm"
        >
          {suggestId ? "Chọn" : "Chấp nhận"}
        </Button>
      </div>
    );
  }
);

var clsInput = css`
  &.bx--text-input {
    @apply bg-white;
  }
`;
