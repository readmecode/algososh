import style from "./queue-page.module.css";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

type TQueueState<T> = {
  item?: T | null;
  color?: ElementStates;
};

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue<typeof input>(7));
  const [queueState, setQueueState] = useState<TQueueState<typeof input>[]>([]);
  const [input, setInput] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [addLoader, setAddLoader] = useState(false);
  const [deleteOneValueLoader, setDeleteOneValueLoader] = useState(false);

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(e, input);
  };

  useEffect(() => {
    setQueueState([...setState()]);
  }, []);

  const setState = () => {
    const arr: TQueueState<typeof input>[] = [];
    const queueCopy = queue.current.getElements();
    for (let i = 0; i < queueCopy.length; i++) {
      arr.push({ item: queueCopy[i], color: ElementStates.Default });
    }
    return arr;
  };

  const addItem = (e: FormEvent, item: typeof input) => {
    if (
      !input ||
      isLoad ||
      queueState[queueState.length - 1].item ||
      queueState[queueState.length - 1].item === ""
    )
      return;

    setAddLoader(true);

    setIsLoad(true);
    const queueStateCopy = [...queueState];
    queueStateCopy[queue.current.getTailIndex()].color = ElementStates.Changing;
    setQueueState([...queueStateCopy]);
    setTimeout(() => {
      queue.current.enqueue(item);
      queueStateCopy[queue.current.getTailIndex() - 1].item = item;
      setQueueState([...queueStateCopy]);
      setInput("");
      setIsLoad(false);

      setAddLoader(false);
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      queueStateCopy[queue.current.getTailIndex() - 1].color =
        ElementStates.Default;
      setQueueState([...queueStateCopy]);
    }, DELAY_IN_MS);
  };

  const deleteOneValue = () => {
    setIsLoad(true);
    setDeleteOneValueLoader(true);
    const queueStateCopy = [...queueState];
    queueStateCopy[queue.current.getHeadIndex()].color = ElementStates.Changing;
    setQueueState([...queueStateCopy]);
    if (queue.current.getLength() === 1) {
      setTimeout(() => {
        const queueStateCopy = [...queueState];
        queueStateCopy[queue.current.getHeadIndex()].item = "";
        queueStateCopy[queue.current.getHeadIndex()].color =
          ElementStates.Default;
        setQueueState([...queueStateCopy]);
        queue.current.dequeue();
        setIsLoad(false);
        setDeleteOneValueLoader(false);
      }, SHORT_DELAY_IN_MS);
    } else {
      setTimeout(() => {
        queue.current.dequeue();
        setQueueState([...setState()]);
        setIsLoad(false);
        setDeleteOneValueLoader(false);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const deleteALL = () => {
    queue.current.clearQueue();
    setQueueState([...setState()]);
  };

  return (
    <SolutionLayout title="Очередь">
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
            disabled={input.length <= 0 || isLoad}
            isLoader={addLoader}
          />
          <Button
            type="button"
            text="Удалить"
            onClick={deleteOneValue}
            disabled={queue.current.getLength() <= 0 || isLoad}
            isLoader={deleteOneValueLoader}
          />
          <div className={style.separate}>
            <Button
              type="reset"
              text="Очистить"
              onClick={deleteALL}
              disabled={
                (queue.current.getLength() <= 0 &&
                  !queueState.map((item) => item.item).includes("")) ||
                isLoad
              }
            />
          </div>
        </form>
        <ul className={style.numberList}>
          {queueState?.map((item, index) => (
            <li key={index}>
              <Circle
                state={item.color}
                index={index}
                letter={item.item || ""}
                head={
                  item.item === ""
                    ? "head"
                    : item.item && index === queue.current.getHeadIndex()
                    ? "head"
                    : ""
                }
                tail={
                  item.item && index === queue.current.getTailIndex() - 1
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
