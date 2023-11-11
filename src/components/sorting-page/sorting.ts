import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TArray = {
  value: number;
  color: ElementStates;
};

// рандомный массив
const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const makeRandomArr = () => {
  const array = [];
  const length = randomInteger(3, 17);
  for (let i = 0; i < length; i++) {
    array.push({
      value: Math.round(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return array;
};

/// функции сортировки

export const selectionSort = async (
  array: TArray[],
  direction: Direction,
  setIsLoadDesc: any,
  setIsLoadAsc: any,
  setIsDisabledButton: any,
  setArray: any
) => {
  direction === Direction.Descending ? setIsLoadDesc(true) : setIsLoadAsc(true);
  setIsDisabledButton(true);
  if (array.length > 1) {
    for (let i = 0; i < array.length - 1; i++) {
      let ind = i;
      for (let j = i + 1; j < array.length; j++) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
        setArray([...array]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
        if (direction === Direction.Descending) {
          if (array[j].value > array[ind].value) {
            ind = j;
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].value < array[ind].value) {
            ind = j;
          }
        }
        array[j].color = ElementStates.Default;
        setArray([...array]);
      }
      [array[i].value, array[ind].value] = [array[ind].value, array[i].value];
      array[i].color = ElementStates.Modified;
    }
    array[array.length - 1].color = ElementStates.Modified;
  }
  setIsDisabledButton(false);
  direction === Direction.Descending
    ? setIsLoadDesc(false)
    : setIsLoadAsc(false);
};

export const bubbleSort = async (
  array: TArray[],
  direction: Direction,
  setIsLoadDesc: any,
  setIsLoadAsc: any,
  setIsDisabledButton: any,
  setArray: any
) => {
  direction === Direction.Descending ? setIsLoadDesc(true) : setIsLoadAsc(true);
  setIsDisabledButton(true);
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      array[j].color = ElementStates.Changing;
      array[j + 1].color = ElementStates.Changing;
      setArray([...array]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      if (direction === Direction.Descending) {
        if (array[j].value < array[j + 1].value) {
          [array[j].value, array[j + 1].value] = [
            array[j + 1].value,
            array[j].value,
          ];
        }
      } else if (direction === Direction.Ascending) {
        if (array[j].value > array[j + 1].value) {
          [array[j].value, array[j + 1].value] = [
            array[j + 1].value,
            array[j].value,
          ];
        }
      }
      array[j].color = ElementStates.Default;
    }
    array[array.length - i - 1].color = ElementStates.Modified;
  }
  setIsDisabledButton(false);
  direction === Direction.Descending
    ? setIsLoadDesc(false)
    : setIsLoadAsc(false);
};
