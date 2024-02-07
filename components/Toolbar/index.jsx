import ThemesToolbar from "@/components/Toolbar/Themes";
import TextToolbar from "@/components/Toolbar/Text";

const Toolbar = ({
  canvas,
  lastActiveObjectId,
  handleOnNewAction,
  drawCanvas,
  undo,
  isUndoDisabled,
  disabled,
}) => {
  return (
    <div className="relative">
      {disabled && (
        <div className="h-full w-full bg-white opacity-60 absolute" />
      )}
      <div className="flex justify-between items-center mt-5 mb-2">
        <p className="text-xl font-semibold px-1 text-orange-500 tracking-wider">
          Toolbar
        </p>
        <button
          type="button"
          className={`flex items-center gap-x-1 px-2 font-semibold text-gray-600 ${
            isUndoDisabled ? "opacity-30" : ""
          }`}
          onClick={undo}
          disabled={isUndoDisabled}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="pb-1">Undo</p>
        </button>
      </div>
      <div className="ring-1 ring-gray-200 px-4 py-3 rounded-md">
        <TextToolbar
          canvas={canvas}
          lastActiveObjectId={lastActiveObjectId}
          handleOnNewAction={handleOnNewAction}
        />
        <div className="mt-8">
          <ThemesToolbar canvas={canvas} drawCanvas={drawCanvas} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
