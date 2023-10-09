import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stringStyles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const swap = (
  arr: TArray[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};

type TArray = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stringArr, setStringArr] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const reverse = async (arr: TArray[]) => {
    setLoader(true);
    const mid = Math.ceil(arr.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i;

      if (i !== j) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setStringArr([...arr]);
        await delay(DELAY_IN_MS);
      }

      swap(arr, i, j);

      arr[i].color = ElementStates.Modified;
      arr[j].color = ElementStates.Modified;

      setStringArr([...arr]);
    }
    setLoader(false);
  };

  const handleButton = () => {
    const newArr = inputValue
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    reverse(newArr);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={stringStyles.mainContainer}>
        <div className={stringStyles.inputContainer}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={inputValue}
            onChange={onChange}
          />
          <div className={stringStyles.button}>
            <Button
              text="Развернуть"
              onClick={handleButton}
              isLoader={loader}
              disabled={inputValue === ""}
            />
          </div>
        </div>
        <ul className={stringStyles.circlesBox}>
          {stringArr &&
            stringArr.map((item, index) => (
              <li key={index}>
                <Circle letter={item.value} state={item.color} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
