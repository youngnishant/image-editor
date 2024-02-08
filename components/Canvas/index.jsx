import { forwardRef } from "react";

const Canvas = forwardRef(
  ({ handleOnDrag, handleDragEnd, handleDragStart }, ref) => {
    return (
      <div className="overflow-auto bg-gray-300 grow-[2] shrink basis-0">
        <canvas
          ref={ref}
          onMouseDown={handleDragStart}
          onMouseMove={handleOnDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        />
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
