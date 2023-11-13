import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const swap = (
  arr: string[],
  startPosition: number,
  endPosition: number
) => {
  const temp = arr[startPosition];

  arr[startPosition] = arr[endPosition];
  arr[endPosition] = temp;

  return arr;
};

export const convertString = async (
  input: any,
  setLoader?: any,
  setString?: any
) => {
  setLoader(true);

  const newArr = input
    .split("")
    .map((value: any) => ({ value, color: ElementStates.Default }));

  const mid = Math.ceil(newArr.length / 2);

  for (let i = 0; i < mid; i++) {
    let j = newArr.length - 1 - i;

    if (i !== j) {
      newArr[i].color = ElementStates.Changing;
      newArr[j].color = ElementStates.Changing;
      setString([...newArr]);

      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
    }

    swap(newArr, i, j);

    newArr[i].color = ElementStates.Modified;
    newArr[j].color = ElementStates.Modified;

    setString([...newArr]);
  }

  setLoader(false);
};
