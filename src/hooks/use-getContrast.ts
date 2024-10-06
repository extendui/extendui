export const getContrastYIQ = (hex: string) => {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
  
    // Calculate the brightness using the YIQ formula
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Return black or white based on the brightness
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  };