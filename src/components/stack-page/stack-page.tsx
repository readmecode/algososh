import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackPageStyles from "./stack-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./classes";
import { delay } from "../../utils/utils";

type TStackItem = {
  value: string;
  color: ElementStates;
};

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [stack] = useState(new Stack<TStackItem>());

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = async () => {
    if (inputValue) {
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setStackArr([...stack.getElements()]);
      await delay(SHORT_DELAY_IN_MS);
      stack.peek.color = ElementStates.Default;
      setStackArr([...stack.getElements()]);
    }
  };

  const handleDeleteButton = async () => {
    stack.peek.color = ElementStates.Changing;
    setStackArr([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArr([...stack.getElements()]);
  };

  const handleRemoveAllButton = () => {
    stack.clear();
    setStackArr([...stack.getElements()]);
  };

  const givePosition = (index: number, arr: TStackItem[]): string => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return "";
    }
  };

  return (
    <SolutionLayout title="Стек">
      <div className={stackPageStyles.mainContainer}>
        <div className={stackPageStyles.inputContainer}>
          <section className={stackPageStyles.inputSection}>
            <div className={stackPageStyles.input}>
              <Input
                maxLength={4}
                isLimitText={true}
                type="text"
                value={inputValue}
                onChange={onChange}
              />
            </div>
            <div className={stackPageStyles.addButton}>
              <Button
                text="Добавить"
                onClick={handleAddButton}
                disabled={inputValue === ""}
              />
            </div>
            <div className={stackPageStyles.deleteButton}>
              <Button
                text="Удалить"
                onClick={handleDeleteButton}
                disabled={!stackArr.length}
              />
            </div>
          </section>
          <div className={stackPageStyles.button}>
            <Button
              text="Очистить"
              onClick={handleRemoveAllButton}
              disabled={!stackArr.length}
            />
          </div>
        </div>
        <ul className={stackPageStyles.circlesBox}>
          {stackArr &&
            stackArr.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.value}
                  state={item.color}
                  index={index}
                  head={givePosition(index, stackArr)}
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
