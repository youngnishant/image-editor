import {
  applyGrayscale,
  applyMutedPastelTheme,
  applyMonochromeTheme,
  applyWarmSepiaTheme,
  applyCoolBlueTheme,
  applyVintageTheme,
} from "./utils";

const themeConfig = [
  {
    label: "Black & White",
    value: "blackwhite",
    filterFunction: applyGrayscale,
  },
  {
    label: "Pastel",
    value: "pastel",
    filterFunction: applyMutedPastelTheme,
  },
  {
    label: "MonoChromatic",
    value: "monochromatic",
    filterFunction: applyMonochromeTheme,
  },
  {
    label: "Warm",
    value: "warm",
    filterFunction: applyWarmSepiaTheme,
  },
  {
    label: "Cool",
    value: "cool",
    filterFunction: applyCoolBlueTheme,
  },
  {
    label: "Vintage",
    value: "vintage",
    filterFunction: applyVintageTheme,
  },
];

export default themeConfig;
