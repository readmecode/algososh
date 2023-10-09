import React, { ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queuePageStyles from "./queue-page.module.css";
import { Queue } from "./classes";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

type TQueueItem = {
  value?: string;
  color: ElementStates;
  head?: string;
};

const emptyQueue = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [queueArr, setQueueArr] = useState<TQueueItem[]>(emptyQueue);
  const [disableButtons, setDisableButtons] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [queue, setQueue] = useState(new Queue<TQueueItem>(7));

  const handeAddButton = async () => {
    if (inputValue) {
      setInputValue("");
      queue.enqueue({ value: inputValue, color: ElementStates.Default });
      setQueue(queue);
      queueArr[queue.getTail() - 1] = {
        value: "",
        color: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      await delay(SHORT_DELAY_IN_MS);
      queueArr[queue.getTail() - 1] = {
        value: inputValue,
        color: ElementStates.Changing,
      };
      setQueueArr([...queueArr]);
      queueArr[queue.getTail() - 1] = {
        value: inputValue,
        color: ElementStates.Default,
      };
      setQueueArr([...queueArr]);
    }
  };

  const handeDeleteButton = async () => {
    setDisableButtons(true);
    queue.dequeue();
    setQueue(queue);
    queueArr[queue.getHead() - 1] = {
      value: queueArr[queue.getHead() - 1].value,
      color: ElementStates.Changing,
    };
    setQueueArr([...queueArr]);
    await delay(SHORT_DELAY_IN_MS);
    queueArr[queue.getHead() - 1] = { value: "", color: ElementStates.Default };
    setQueueArr([...queueArr]);
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      queueArr[queue.getHead() - 1] = {
        value: "",
        color: ElementStates.Default,
        head: "head",
      };
      setQueueArr([...queueArr]);
    }
    setDisableButtons(false);
  };

  const handleRemoveButton = () => {
    queue.clear();
    setQueue(queue);
    setQueueArr(
      Array.from({ length: 7 }, () => ({
        value: "",
        color: ElementStates.Default,
      }))
    );
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={queuePageStyles.mainContainer}>
        <div className={queuePageStyles.inputContainer}>
          <section className={queuePageStyles.inputSection}>
            <div className={queuePageStyles.input}>
              <Input
                maxLength={4}
                isLimitText={true}
                type="text"
                onChange={onChange}
                value={inputValue}
              />
            </div>
            <div className={queuePageStyles.addButton}>
              <Button
                text="Добавить"
                disabled={inputValue === "" || disableButtons}
                onClick={handeAddButton}
              />
            </div>
            <div className={queuePageStyles.deleteButton}>
              <Button
                text="Удалить"
                disabled={queue.isEmpty() || disableButtons}
                onClick={handeDeleteButton}
              />
            </div>
          </section>
          <div className={queuePageStyles.button}>
            <Button
              text="Очистить"
              disabled={
                (!queue.getHead() && !queue.getTail()) || disableButtons
              }
              onClick={handleRemoveButton}
            />
          </div>
        </div>
        <ul className={queuePageStyles.circlesBox}>
          {queueArr &&
            queueArr.slice(0, 7).map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.value}
                  index={index}
                  state={item.color}
                  head={
                    (index === queue.getHead() && !queue.isEmpty()) || item.head
                      ? "head"
                      : ""
                  }
                  tail={
                    index === queue.getTail() - 1 && !queue.isEmpty()
                      ? "tail"
                      : ""
                  }
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
