import React, { useState, useRef, useEffect } from "react";

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const textRef = useRef("");

  const [fileSrc, setFileSrc] = useState(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(18);
  const [actionObjects, setActionObjects] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastActiveTextId, setLastActiveTextId] = useState(0);
  const [undoActions, setUndoActions] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          // Set canvas dimensions to match the image size
          canvas.width = image.width;
          canvas.height = image.height;

          // Draw the image onto the canvas
          context.drawImage(image, 0, 0);
          setFileSrc(image);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;

    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "edited_image.png";
    downloadLink.click();
  };

  const handleColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    if (e.target.value > 0) {
      setFontSize(e.target.value);
    }
  };

  const handleTextDragStart = (e) => {
    setIsDragging(true);
  };

  const handleTextDragEnd = () => {
    setIsDragging(false);
  };

  const handleTextDrag = (e) => {
    if (isDragging) {
      const textObjIndex = actionObjects.findIndex(
        (text) => text.id === lastActiveTextId
      );

      if (textObjIndex !== -1) {
        const newData = [...actionObjects];

        newData[textObjIndex] = {
          ...newData[textObjIndex],
          x: e.clientX - canvasRef.current.getBoundingClientRect().left,
          y: e.clientY - canvasRef.current.getBoundingClientRect().top,
        };

        setActionObjects(newData);
        drawCanvas();
      }
    }
  };

  const handleAddText = () => {
    const newText = textRef.current.value;
    if (newText.trim() !== "") {
      const textObj = {
        id: lastActiveTextId + 1,
        text: newText,
        x: 20,
        y: 40 + 30 * actionObjects.length,
        color: textColor,
        fontSize: fontSize,
        type: "text",
      };

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.font = `${fontSize}px`;
      context.fillStyle = textColor;
      context.fillText(textObj.text, textObj.x, textObj.y);

      setLastActiveTextId(textObj.id);
      setActionObjects((prevState) => [...prevState, textObj]);
      setTextColor("#000000");
      textRef.current.value = "";
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (fileSrc) {
      context.drawImage(fileSrc, 0, 0);
    }

    actionObjects.forEach((textObj) => {
      context.font = `${textObj.fontSize}px`;
      context.fillStyle = textObj.color;
      context.fillText(textObj.text, textObj.x, textObj.y);
    });
  };

  const undo = () => {
    if (lastActiveTextId > 0) {
      setUndoActions((prevState) => [
        ...prevState,
        actionObjects[lastActiveTextId],
      ]);

      const updatedTextObj = actionObjects.filter(
        (text) => text.id !== lastActiveTextId
      );

      setActionObjects(() => [...updatedTextObj]);
      setLastActiveTextId((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [lastActiveTextId]);

  return (
    <div>
      <header className="flex justify-between items-center px-6 border-b">
        <p className="text-xl font-medium ">
          <span className="">Image</span>
          <span className="text-orange-600">Editor</span>
        </p>
        <div className="py-1">
          <button type="submit" className="rounded-full bg-orange-600">
            <div className="flex flex-row justify-center items-center gap-x-3 py-3 px-6">
              <span className="text-md text-white pb-0.5">Login</span>
              <svg
                stroke="#fff"
                fill="#fff"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className=""
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm-40 326.63L193.37 352l96-96-96-96L216 137.37 334.63 256z"></path>
              </svg>
            </div>
          </button>
        </div>
      </header>
      <div
        style={{
          height: "80vh",
        }}
        className="flex md:flex-row flex-col justify-between mt-6 px-10"
      >
        {/* Toolbar */}
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="flex justify-between items-center gap-x-2">
            <div className="flex justify-center items-center rounded-md ring-1 ring-gray-600 cursor-pointer">
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="flex flex-row justify-center items-center gap-x-3 py-2 px-3">
                  <span className="text-sm text-gray-600 pb-0.5">
                    Upload Image
                  </span>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </div>
            <button
              type="button"
              className="rounded-md cursor-pointer"
              onClick={handleDownload}
            >
              <div className="flex flex-row justify-center items-center p-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                >
                  <path
                    d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                    stroke="#4B5563"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
                    stroke="#4B5563"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
          <p className="text-xl font-bold mt-10 px-1 mb-3">Toolbar</p>
          <div className="ring-1 ring-gray-200 px-4 py-3 rounded-md">
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="textInput" className="text-sm text-gray-600">
                Enter Text:
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  id="textInput"
                  ref={textRef}
                  className="w-3/4 outline-none border-b"
                />
                <button
                  type="button"
                  onClick={handleAddText}
                  className="w-1/4 bg-gray-600 text-white text-xs font-semibold px-3 py-1 ml-1 rounded-sm"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex justify-start gap-x-4 mt-5 ">
              <div className="flex flex-col justify-start items-start gap-y-2">
                <label htmlFor="textColor" className="text-xs text-gray-400">
                  Text Color
                </label>
                <input
                  type="color"
                  id="textColor"
                  value={textColor}
                  onChange={handleColorChange}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-y-2">
                <label htmlFor="fontSize" className="text-xs text-gray-400">
                  Font Size
                </label>
                <input
                  type="number"
                  id="fontSize"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="outline-none w-12 px-1 text-center border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Canvas */}
        <div
          className="pb-10"
          style={{
            flex: 2,
            position: "relative",
            height: "80vh",
          }}
        >
          <div className="flex justify-center gap-x-2 mb-1">
            <button
              type="button"
              className="border border-gray-400 rounded-md"
              onClick={undo}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <path
                  d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button type="button" className="border border-gray-400 rounded-md">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <path
                  d="M20 7H9.00001C7.13077 7 6.19615 7 5.5 7.40193C5.04395 7.66523 4.66524 8.04394 4.40193 8.49999C4 9.19615 4 10.1308 4 12C4 13.8692 4 14.8038 4.40192 15.5C4.66523 15.9561 5.04394 16.3348 5.5 16.5981C6.19615 17 7.13077 17 9 17H16M20 7L17 4M20 7L17 10"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div
            style={{
              overflow: "auto",
              background: "#D3D3D3",
              height: "70vh",
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleTextDragStart}
              onMouseMove={handleTextDrag}
              onMouseUp={handleTextDragEnd}
              onMouseLeave={handleTextDragEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
