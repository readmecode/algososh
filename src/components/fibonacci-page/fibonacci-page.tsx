import style from "./fibonacci-page.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<Array<string | number>>([]);

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!(Number(evt.target.value) < 0) && Number(evt.target.value) % 1 == 0) {
      setInput(evt.target.value);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let prev = 0;
    let next = 1;
    let tempArr: Array<string | number> = [];

    setLoader(true);
    for (let i = 0; i <= Number(input); i++) {
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

      let temp = next;
      next = prev + next;
      prev = temp;
      tempArr = [...tempArr, prev];

      setArray(tempArr);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div>
        <form className={style.form} onSubmit={submit}>
          <Input
            max={19}
            isLimitText={true}
            value={input}
            onChange={onChangeInput}
            type={"number"}
          />
          <Button
            type="submit"
            text="Рассчитать"
            isLoader={loader}
            disabled={
              Number(input) < 0 || Number(input) > 19 || Number(input) === 0
            }
          />
        </form>
        <div className={style.letterList}>
          {array?.map((item, index) => (
            <li key={index}>
              <Circle
                letter={String(item)}
                state={ElementStates.Default}
                index={index}
              />
            </li>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
