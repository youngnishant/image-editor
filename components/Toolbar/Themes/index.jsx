import themeConfig from "./config";

const ThemesToolbar = ({ handleOnNewAction, lastActiveObjectId }) => {
  const handleOnFilterClick = (filterFunction, themeName) => {
    const themeActionObj = {
      id: lastActiveObjectId + 1,
      type: "theme",
      themeName,
      filterFunction,
    };

    handleOnNewAction(themeActionObj.id, themeActionObj);
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
