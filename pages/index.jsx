import React, { useState, useRef, useEffect } from "react";

import Toolbar from "@/components/Toolbar";
import FileAction from "@/components/FileAction";
import Header from "@/components/Header";
import Canvas from "@/components/Canvas";

const ImageEditor = () => {
  const canvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [actionObjects, setActionObjects] = useState([]);
  const [lastActiveObjectId, setLastActiveObjectId] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const undo = () => {
    if (lastActiveObjectId > 0) {
      const updatedTextObj = actionObjects.filter(
        (text) => text.id !== lastActiveObjectId
      );

      setActionObjects(() => [...updatedTextObj]);
      setLastActiveObjectId((prevState) => prevState - 1);
    }
  };

  const applyTextAction = (context, actionObj) => {
    context.font = `${actionObj.fontSize}px Arial`;

    context.fillStyle = actionObj.color;
    context.fillText(actionObj.text, actionObj.x, actionObj.y);
  };

  const applyThemeFilter = () => {
    const themeActionObj = actionObjects.find(
      (actionObj) => actionObj.type === "theme"
    );
    if (themeActionObj) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // applying filter in last to add other change first
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      themeActionObj.filterFunction(context, imageData);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (imageSrc) {
      context.drawImage(imageSrc, 0, 0);
    }

    actionObjects.forEach((actionObj) => {
      if (actionObj.type === "text") {
        applyTextAction(context, actionObj);
      }
    });
  };

  const changeActionObjectPosition = (x, y) => {
    const objIndex = actionObjects.findIndex(
      (item) => item.id === lastActiveObjectId
    );

    if (objIndex !== -1) {
      const newData = [...actionObjects];

      newData[objIndex] = {
        ...newData[objIndex],
        x: x - canvasRef.current.getBoundingClientRect().left,
        y: y - canvasRef.current.getBoundingClientRect().top,
      };

      return newData;
    }
  };

  const handleObjectDrag = (e) => {
    if (!isDragging) return;
    const lastActionObj = actionObjects.find(
      (action) => action.id === lastActiveObjectId
    );

    if (lastActionObj.type === "text") {
      const newData = changeActionObjectPosition(e.clientX, e.clientY);
      setActionObjects(newData);
      drawCanvas();
    }
  };

  const handleOnNewAction = (id, newActionObj) => {
    if (newActionObj.type === "theme") {
      const updatedActionObj = actionObjects.filter(
        (action) => action.type !== "theme"
      );
      setActionObjects(() => [...updatedActionObj, newActionObj]);
    } else {
      setActionObjects((prevState) => [...prevState, newActionObj]);
    }

    setLastActiveObjectId(id);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const reset = () => {
    setActionObjects([]);
    setLastActiveObjectId(0);
  };

  useEffect(() => {
    drawCanvas();
    applyThemeFilter();
  }, [lastActiveObjectId, isDragging]);

  useEffect(() => {
    reset();
  }, [imageSrc]);

  return (
    <div>
      <Header />
      <div className="relative flex md:flex-row flex-col-reverse justify-between mt-6 md:px-10 px-2 h-[80vh]">
        <div className="flex-1 px-8">
          <FileAction
            canvasRef={canvasRef}
            setImageSrc={setImageSrc}
            lastActiveObjectId={lastActiveObjectId}
            disabled={!imageSrc}
          />
          <Toolbar
            lastActiveObjectId={lastActiveObjectId}
            handleOnNewAction={handleOnNewAction}
            undo={undo}
            isUndoDisabled={actionObjects.length === 0}
            disabled={!imageSrc}
          />
        </div>
        <Canvas
          ref={canvasRef}
          handleOnDrag={handleObjectDrag}
          handleDragEnd={handleDragEnd}
          handleDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
