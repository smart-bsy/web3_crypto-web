export const formatAddress = (address) => {
  const len = address.length;
  return `${address.slice(0, 5)}...${address.slice(len - 4)}`;
};
