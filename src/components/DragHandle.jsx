import '../styles/dragHandle.css'
import { ReactComponent as DragHandleIcon } from "../assets/drag_handle.svg";
import React from "react";

export function DragHandle(props) {
  return (
    <div className="drag" {...props}>
      <DragHandleIcon />
    </div>
  );
}