// Apply a sepia filter
const applySepia = (context, imageData) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
    data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
    data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
  }
  context.putImageData(imageData, 0, 0);
};

// Apply a vignette filter
const applyVignette = (context, imageData, strength) => {
  const data = imageData.data;
  const centerX = imageData.width / 2;
  const centerY = imageData.height / 2;

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % imageData.width;
    const y = Math.floor(i / 4 / imageData.width);

    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const vignette = 1 - (distance / (imageData.width / 2)) * strength;

    data[i] *= vignette; // Red
    data[i + 1] *= vignette; // Green
    data[i + 2] *= vignette; // Blue
  }
  context.putImageData(imageData, 0, 0);
};

// Apply a color tint to the image
const applyColorTint = (context, imageData, tintRGB) => {
  const data = imageData.data;
  const tintR = tintRGB[0];
  const tintG = tintRGB[1];
  const tintB = tintRGB[2];

  for (let i = 0; i < data.length; i += 4) {
    data[i] += tintR; // Red
    data[i + 1] += tintG; // Green
    data[i + 2] += tintB; // Blue
  }
  context.putImageData(imageData, 0, 0);
};

// Apply a brightness filter
const applyBrightness = (context, imageData, factor) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= factor; // Red
    data[i + 1] *= factor; // Green
    data[i + 2] *= factor; // Blue
  }
  context.putImageData(imageData, 0, 0);
};

// Apply a contrast filter
const applyContrast = (context, imageData, factor) => {
  const data = imageData.data;
  const contrastFactor = (factor + 255) / 255;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = (data[i] - 128) * contrastFactor + 128; // Red
    data[i + 1] = (data[i + 1] - 128) * contrastFactor + 128; // Green
    data[i + 2] = (data[i + 2] - 128) * contrastFactor + 128; // Blue
  }
  context.putImageData(imageData, 0, 0);
};

// Apply a vintage theme
const applyVintageTheme = (context, imageData) => {
  applySepia(context, imageData);
  applyVignette(context, imageData, 0.4);
};

// Apply a cool blue theme
const applyCoolBlueTheme = (context, imageData) => {
  applyBrightness(context, imageData, 0.8);
  applyContrast(context, imageData, 1.2);
  applyColorTint(context, imageData, [0, 0, 255]); // Apply a blue tint
};

// Apply a warm sepia theme
const applyWarmSepiaTheme = (context, imageData) => {
  applySepia(context, imageData);
  applyBrightness(context, imageData, 1.2);
};

// Apply a high contrast monochrome theme
const applyMonochromeTheme = (context, imageData) => {
  applyGrayscale(context, imageData);
  applyContrast(context, imageData, 2);
};

// Apply a muted pastel theme
const applyMutedPastelTheme = (context, imageData) => {
  applyBrightness(context, imageData, 0.9);
  applyContrast(context, imageData, 1.2);
  applyColorTint(context, imageData, [255, 228, 196]); // Apply a peach tint
};

const applyGrayscale = (context, imageData) => {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = avg;
  }
  context.putImageData(imageData, 0, 0);
};

export {
  applyGrayscale,
  applyMutedPastelTheme,
  applyMonochromeTheme,
  applyWarmSepiaTheme,
  applyCoolBlueTheme,
  applyVintageTheme,
};
