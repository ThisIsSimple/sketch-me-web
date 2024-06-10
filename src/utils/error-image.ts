const errorImages = ["/result/error1.webp"];

export const getRandomErrorImage = () => {
  return errorImages[Math.floor(Math.random() * errorImages.length)];
};
