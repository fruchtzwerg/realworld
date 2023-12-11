export const getRandomWidth = () => {
  const random1 = Math.random();
  if (random1 > 0.35) return '100%';

  const random = Math.random();
  const width = Math.max(Math.ceil(random * 100), 40);

  return `${width}%`;
};
