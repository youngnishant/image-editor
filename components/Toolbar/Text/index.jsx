import { useState, useRef } from "react";

const Text = ({ lastActiveObjectId, handleOnNewAction }) => {
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(18);

  const textRef = useRef("");

  const handleColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    if (e.target.value > 0) {
      setFontSize(e.target.value);
    }
  };

  const handleAddText = () => {
    const newText = textRef.current.value;
    if (newText.trim() !== "") {
      const textObj = {
        id: lastActiveObjectId + 1,
        text: newText,
        x: 20,
        y: 40 + 30,
        color: textColor,
        fontSize: fontSize,
        type: "text",
      };

      handleOnNewAction(textObj.id, textObj);

      setTextColor("#000000");
      textRef.current.value = "";
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-start">
        <div className="flex w-full mt-2">
          <input
            type="text"
            ref={textRef}
            placeholder="Enter Some Text"
            className="w-3/4 outline-none bg-orange-50 rounded-md px-2 py-3 text-xs"
          />
          <button
            type="button"
            onClick={handleAddText}
            className="w-1/4 bg-orange-400 text-white text-md font-bold px-3 py-1 ml-1 rounded-sm"
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
  );
};

export default Text;
