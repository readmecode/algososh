import style from "./stack-page.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TItem = {
  value?: string;
  color?: ElementStates;
};
const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [array, setArray] = useState<TItem[]>([]);
  const [controls, setControls] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Number(input)) {
      setControls({ ...controls, add: true });
      stack.push(input);
      setArray([
        ...array,
        { value: stack.peak()!, color: ElementStates.Changing },
      ]);
      setInput("");

      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

      setArray([
        ...array,
        { value: stack.peak()!, color: ElementStates.Default },
      ]);
      setControls({ ...controls, add: false });
    }
  };

  const deleteLast = async () => {
    setControls({ ...controls, delete: true });
    array.at(-1)!.color = ElementStates.Changing;
    setArray([...array]);

    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    stack.pop();
    array.pop();
    if (array.length > 0) array.at(-1)!.color = ElementStates.Default;
    setArray([...array]);
    setControls({ ...controls, delete: false });
  };

  const deleteALL = () => {
    stack.clear();
    setArray([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={style.main}>
        <form className={style.form} onSubmit={submit}>
          <Input
            maxLength={4}
            isLimitText={true}
            value={input}
            onChange={onChangeInput}
          />
          <Button
            type="submit"
            text="Добавить"
            isLoader={controls.add}
            disabled={!input || controls.delete || controls.clear}
          />
          <Button
            type={"button"}
            data-testid="button-delete"
            text="Удалить"
            isLoader={controls.delete}
            disabled={array.length === 0 || controls.add || controls.clear}
            onClick={deleteLast}
          />
          <div className={style.separate}>
            <Button
              type={"reset"}
              text="Очистить"
              onClick={deleteALL}
              isLoader={controls.clear}
              disabled={array.length === 0 || controls.delete || controls.add}
            />
          </div>
        </form>
        <div className={style.numberList}>
          {array?.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.color}
                head={stack.tail === index + 1 ? "top" : null}
                index={index}
              />
            </li>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
