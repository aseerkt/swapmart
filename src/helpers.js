export function unique(arr) {
  return [...new Set(arr)];
}

export let arrayFlatChecker = (arr, target) =>
  target.every((v) => arr.includes(v));
