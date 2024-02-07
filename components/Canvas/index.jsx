import { useState, forwardRef } from "react";

const Canvas = forwardRef(({ handleDrag }, ref) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleOnDrag = (e) => {
    if (isDragging) {
      handleDrag(e);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

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
});

Canvas.displayName = "Canvas";

export default Canvas;
