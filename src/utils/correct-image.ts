const correctImages = ["/result/correct1.webp"];

export const getRandomCorrectImage = () => {
  return correctImages[Math.floor(Math.random() * correctImages.length)];
};
