import React, { useState } from "react";

const TextOverlay = ({ text, fontSize, color, position, handleDragStart }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        userSelect: "none",
        cursor: "grab",
      }}
      onMouseDown={handleDragStart}
    >
      <p style={{ margin: 0, fontSize, color }}>{text}</p>
    </div>
  );
};

const ImageEditor = () => {
  const [text, setText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = useState(null);
  const [textColor, setTextColor] = useState("#ff0000"); // Default color is red
  const [rotation, setRotation] = useState(0);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    // Create a temporary canvas to draw the rotated image and text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match the image with rotation
    const image = new Image();
    image.src = imageSrc;
    canvas.width =
      Math.abs(Math.cos(rotation)) * image.width +
      Math.abs(Math.sin(rotation)) * image.height;
    canvas.height =
      Math.abs(Math.sin(rotation)) * image.width +
      Math.abs(Math.cos(rotation)) * image.height;

    // Translate and rotate the context
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(rotation);
    context.drawImage(image, -image.width / 2, -image.height / 2);

    // Draw the text onto the canvas
    context.font = "18px Arial";
    context.fillStyle = textColor;
    context.fillText(text, position.x, position.y);

    // Convert the canvas content to a data URL and create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "edited_image.png";
    downloadLink.click();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleDragMove = (e) => {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      setPosition({ x, y });
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleRotate = () => {
    setRotation(rotation + Math.PI / 2); // Rotate 90 degrees
  };

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
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="flex gap-x-2">
            <div className="flex justify-center items-center rounded-full border-2 border-orange-600 cursor-pointer">
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="flex flex-row justify-center items-center gap-x-3 py-3 px-6">
                  <span className="text-md text-orange-600 font-medium pb-0.5">
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
              className="rounded-full bg-orange-600 cursor-pointer"
              onClick={handleDownload}
            >
              <div className="flex flex-row justify-center items-center gap-x-3 py-3 px-6">
                <span className="text-md text-white font-medium pb-0.5">
                  Download
                </span>
              </div>
            </button>
          </div>
          <div className="mt-10 ring-2 ring-orange-600 px-4 py-3 rounded-md">
            <div className="flex justify-between items-center">
              <label htmlFor="textInput" className="w-1/4 font-medium">
                Enter Text:
              </label>
              <input
                type="text"
                id="textInput"
                value={text}
                onChange={handleTextChange}
                className="w-3/4 outline-none border-b"
              />
            </div>
            <div className="mt-5 flex justify-start items-center gap-x-4">
              <label htmlFor="textColor" className="font-medium">
                Text Color:
              </label>
              <input
                type="color"
                id="textColor"
                value={textColor}
                onChange={handleColorChange}
              />
            </div>
          </div>

          <div></div>
          <div className="mt-5">
            <button
              onClick={handleRotate}
              className="rounded-full bg-orange-600 cursor-pointer"
            >
              <div className="flex flex-row justify-center items-center gap-x-3 py-3 px-6">
                <span className="text-md text-white font-medium pb-0.5 flex items-center justify-center gap-x-2">
                  <svg
                    viewBox="0 0 214.367 214.367"
                    className="h-4 w-4 fill-white"
                  >
                    <path
                      d="M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494
	c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22
	c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0
	S202.403,42.716,202.403,95.22z"
                    />
                  </svg>
                  <span className="pb-0.5">Rotate 90°</span>
                </span>
              </div>
            </button>
          </div>
        </div>
        <div
          id="image-container"
          style={{
            flex: 2,
            overflow: "auto",
            position: "relative",
            background: "#D3D3D3",
          }}
        >
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt="Editor Image"
                style={{
                  transform: `rotate(${rotation}rad)`,
                  cursor: "crosshair",
                }}
                onClick={handleImageClick}
              />
              {text && (
                <TextOverlay
                  text={text}
                  fontSize="18px"
                  color={textColor}
                  position={position}
                  handleDragStart={handleDragStart}
                />
              )}
            </>
          ) : (
            <p className="flex justify-center items-center mt-10 text-gray-500">
              Upload a image to start editing.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
