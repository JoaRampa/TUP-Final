export const formatNumber = (number, thousandSeparator = ".") => {
  if (typeof number !== "number" || isNaN(number)) return "";
  return number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
};