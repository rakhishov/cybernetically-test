import { DragIconWrapper } from "./styles";
import { ReactComponent as DragHandleIcon } from "../drag_handle.svg";
import React from "react";

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <DragHandleIcon />
    </DragIconWrapper>
  );
}