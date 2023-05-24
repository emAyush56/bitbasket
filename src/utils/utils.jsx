export function CapFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PriceFormatter(price, roundoff) {
  const formattedNumber = price.toFixed(roundoff);
  return new Intl.NumberFormat("en-US").format(formattedNumber);
}
