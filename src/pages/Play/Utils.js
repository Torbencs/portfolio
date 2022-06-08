export const BetweenRange = (value, min, max) => {
  if (value > max) {
    return max;
  } else if (value < min) {
    return min;
  } else {
    return value;
  }
};

export const EuclidDist = (a, b) => {
  return Math.hypot(...Object.keys(a).map((k) => b[k] - a[k]));
};
