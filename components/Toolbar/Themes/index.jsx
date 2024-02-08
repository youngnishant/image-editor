import themeConfig from "./config";

const ThemesToolbar = ({ canvas, handleOnNewAction, lastActiveObjectId }) => {
  const handleOnFilterClick = (filterFunction, themeName) => {
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const themeActionObj = {
      id: lastActiveObjectId + 1,
      type: "theme",
      themeName,
    };

    handleOnNewAction(themeActionObj.id, themeActionObj);

    setTimeout(() => {
      filterFunction(context, imageData);
    }, 500);
  };

  return (
    <div className="w-full">
      <p className="font-medium">Themes</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {themeConfig.map((theme) => (
          <button
            key={theme.value}
            type="button"
            onClick={() =>
              handleOnFilterClick(theme.filterFunction, theme.value)
            }
            className="border rounded-md px-2 py-1"
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemesToolbar;
