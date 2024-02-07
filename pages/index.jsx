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

  const undo = () => {
    if (lastActiveObjectId > 0) {
      const updatedTextObj = actionObjects.filter(
        (text) => text.id !== lastActiveObjectId
      );

      setActionObjects(() => [...updatedTextObj]);
      setLastActiveObjectId((prevState) => prevState - 1);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (imageSrc) {
      context.drawImage(imageSrc, 0, 0);
    }

    actionObjects.forEach((textObj) => {
      context.font = `${textObj.fontSize}px`;
      context.fillStyle = textObj.color;
      context.fillText(textObj.text, textObj.x, textObj.y);
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
    const newData = changeActionObjectPosition(e.clientX, e.clientY);
    setActionObjects(newData);
    drawCanvas();
  };

  const handleOnNewAction = (id, newActionObj) => {
    setLastActiveObjectId(id);
    setActionObjects((prevState) => [...prevState, newActionObj]);
  };

  const reset = () => {
    setActionObjects([]);
    setLastActiveObjectId(0);
  };

  useEffect(() => {
    drawCanvas();
  }, [lastActiveObjectId]);

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
          />
          <Toolbar
            canvas={canvasRef.current}
            lastActiveObjectId={lastActiveObjectId}
            handleOnNewAction={handleOnNewAction}
            undo={undo}
            isUndoDisabled={actionObjects.length === 0}
          />
        </div>
        <Canvas
          ref={canvasRef}
          handleDrag={handleObjectDrag}
          actionObjects={actionObjects}
          lastActiveObjectId={lastActiveObjectId}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
