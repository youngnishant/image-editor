import { useState } from "react";

const FileAction = ({ canvasRef, setImageSrc }) => {
  const [isImagePresent, setImagePresent] = useState(false);

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
          setImageSrc(image);
          setImagePresent(true);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    setImageSrc(null);
    setImagePresent(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;

    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "edited_image.png";
    downloadLink.click();
  };

  return (
    <div className="flex justify-between items-center gap-x-4">
      <div className="flex justify-between items-center gap-x-4 grow">
        {isImagePresent ? (
          <div className="flex justify-center items-center rounded-md ring-1 ring-gray-600 cursor-pointer">
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleImageRemove}
            >
              <div className="flex flex-row justify-center items-center gap-x-3 py-2 px-3">
                <span className="text-sm text-gray-600 pb-0.5">
                  Remove Image
                </span>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center rounded-md ring-1 ring-gray-600 cursor-pointer">
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="flex flex-row justify-center items-center gap-x-3 py-2 px-3">
                <span className="text-sm text-gray-600 pb-0.5">Add Image</span>
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
        )}
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
    </div>
  );
};

export default FileAction;
