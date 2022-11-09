export const range = (start: number, end: number, step: number = 1) : Array<number> => {

  const range = [];

  for (let i = start; i <= end; i += step) {
    range.push(i);
  }

  return range;

}