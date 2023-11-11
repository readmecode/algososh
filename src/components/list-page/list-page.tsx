import style from "./list-page.module.css";
import React, { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";

type TLoader = {
  insertInBegin: boolean;
  insertAtEnd: boolean;
  appendByIndex: boolean;
  removeHead: boolean;
  removeTail: boolean;
  removeFrom: boolean;
};

type TShiftElement = {
  value: string;
  state: ElementStates;
  position: "addAction" | "removeAction";
};

type TListArr = {
  value: string;
  state: ElementStates;
  shiftElement: TShiftElement | null;
};

export const ListPage: React.FC = () => {
  const initialArray = ["0", "34", "8", "1"];
  const MAXINDEX: number = 7;

  const list = new LinkedList<string>(initialArray);

  const listArr: TListArr[] = initialArray.map((item) => ({
    value: item,
    state: ElementStates.Default,
    shiftElement: null,
  }));

  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [listArray, setListArray] = useState<TListArr[]>(listArr);
  const [isLoader, setIsLoader] = useState<TLoader>({
    insertInBegin: false,
    insertAtEnd: false,
    appendByIndex: false,
    removeHead: false,
    removeTail: false,
    removeFrom: false,
  });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };

  const handleClickAddHead = async () => {
    setIsLoader({ ...isLoader, insertInBegin: true });
    setDisabled(true);
    list.prepend(inputValue);
    if (listArray.length > 0) {
      listArray[0].shiftElement = {
        value: inputValue,
        state: ElementStates.Changing,
        position: "addAction",
      };
    }
    setListArray([...listArray]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray[0].shiftElement = null;
    listArray.unshift({
      ...listArray[0],
      value: inputValue,
      state: ElementStates.Modified,
    });
    setListArray([...listArray]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray[0].state = ElementStates.Default;
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, insertInBegin: false });
    setDisabled(false);
    setInputValue("");
  };

  const handleClickAddTail = async () => {
    setIsLoader({ ...isLoader, insertAtEnd: true });
    setDisabled(true);
    setInputValue("");
    list.append(inputValue);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      shiftElement: {
        value: inputValue,
        state: ElementStates.Changing,
        position: "addAction",
      },
    };
    setListArray([...listArray]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      shiftElement: null,
    };

    listArray.push({
      value: inputValue,
      state: ElementStates.Modified,
      shiftElement: null,
    });
    setListArray([...listArray]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray[listArray.length - 1].state = ElementStates.Default;
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, insertAtEnd: false });
    setDisabled(false);
  };

  const handleClickAddByIndex = async () => {
    setIsLoader({ ...isLoader, appendByIndex: true });
    setDisabled(true);
    list.addByIndex(inputValue, Number(inputIndex));
    for (let i = 0; i <= Number(inputIndex); i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        shiftElement: {
          value: inputValue,
          state: ElementStates.Changing,
          position: "addAction",
        },
      };
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setListArray([...listArray]);
      if (i > 0) {
        listArray[i - 1] = {
          ...listArray[i - 1],
          shiftElement: null,
        };
      }
      setListArray([...listArray]);
    }
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray[Number(inputIndex)] = {
      ...listArray[Number(inputIndex)],
      state: ElementStates.Default,
      shiftElement: null,
    };
    listArray.splice(Number(inputIndex), 0, {
      value: inputValue,
      state: ElementStates.Modified,
      shiftElement: null,
    });
    setListArray([...listArray]);
    listArray[Number(inputIndex)].state = ElementStates.Default;
    listArray.forEach((elem: TListArr) => {
      elem.state = ElementStates.Default;
    });
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setListArray([...listArray]);
    setInputValue("");
    setInputIndex("");
    setIsLoader({ ...isLoader, appendByIndex: false });
    setDisabled(false);
  };

  const handleClickRemoveHead = async () => {
    setIsLoader({ ...isLoader, removeHead: true });
    setDisabled(true);
    listArray[0] = {
      ...listArray[0],
      value: "",
      shiftElement: {
        value: listArray[0].value,
        state: ElementStates.Changing,
        position: "removeAction",
      },
    };
    list.deleteHead();
    setListArray([...listArray]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray.shift();
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, removeHead: false });
    setDisabled(false);
  };

  const handleClickRemoveTail = async () => {
    setIsLoader({ ...isLoader, removeTail: true });
    setDisabled(true);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      value: "",
      shiftElement: {
        value: listArray[listArray.length - 1].value,
        state: ElementStates.Changing,
        position: "removeAction",
      },
    };
    list.deleteTail();
    setListArray([...listArray]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    listArray.pop();
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, removeTail: false });
    setDisabled(false);
  };

  const handleClickRemoveByIndex = async () => {
    setIsLoader({ ...isLoader, removeFrom: true });
    setDisabled(true);
    list.deleteByIndex(Number(inputIndex));
    for (let i = 0; i <= Number(inputIndex); i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
      };
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setListArray([...listArray]);
    }
    listArray[Number(inputIndex)] = {
      ...listArray[Number(inputIndex)],
      value: "",
      shiftElement: {
        value: listArray[Number(inputIndex)].value,
        state: ElementStates.Changing,
        position: "removeAction",
      },
    };
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setListArray([...listArray]);
    listArray.splice(Number(inputIndex), 1);
    listArray[Number(inputIndex) - 1] = {
      ...listArray[Number(inputIndex) - 1],
      value: listArray[Number(inputIndex) - 1].value,
      state: ElementStates.Modified,
      shiftElement: null,
    };
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setListArray([...listArray]);
    listArray.forEach((elem) => {
      elem.state = ElementStates.Default;
    });
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setListArray([...listArray]);
    setIsLoader({ ...isLoader, removeFrom: false });
    setDisabled(false);
    setInputIndex("");
  };
  return (
    <SolutionLayout title="Связный список">
      <div className={style.main}>
        <form className={style.form}>
          <div className={style.topSettingPanel}>
            <Input
              placeholder="Введите значение"
              isLimitText={true}
              maxLength={4}
              onChange={onChangeValue}
              disabled={disabled}
              value={inputValue}
            />
            <Button
              text="Добавить в head"
              linkedList="small"
              onClick={handleClickAddHead}
              isLoader={isLoader.insertInBegin}
              disabled={!inputValue || disabled || listArray.length >= MAXINDEX}
            />
            <Button
              text="Добавить в tail"
              linkedList="small"
              onClick={handleClickAddTail}
              disabled={!inputValue || disabled || listArray.length >= MAXINDEX}
              isLoader={isLoader.insertAtEnd}
            />
            <Button
              text="Удалить из head"
              linkedList="small"
              onClick={handleClickRemoveHead}
              isLoader={isLoader.removeHead}
              disabled={listArray.length <= 1 || disabled}
            />
            <Button
              text="Удалить из tail"
              linkedList="small"
              onClick={handleClickRemoveTail}
              isLoader={isLoader.removeTail}
              disabled={listArray.length <= 1 || disabled}
            />
          </div>
          <div className={style.bottomSettingPanel}>
            <Input
              type="number"
              placeholder={"Введите индекс"}
              value={inputIndex}
              onChange={onChangeIndex}
              isLimitText={false}
              maxLength={1}
              max={MAXINDEX}
              disabled={disabled}
            />
            <Button
              text="Добавить по индексу"
              linkedList="big"
              onClick={handleClickAddByIndex}
              isLoader={isLoader.appendByIndex}
              disabled={
                !inputValue ||
                !inputIndex ||
                disabled ||
                Number(inputIndex) > listArray.length - 1 ||
                listArray.length >= MAXINDEX
              }
            />
            <Button
              text="Удалить по индексу"
              linkedList="big"
              onClick={handleClickRemoveByIndex}
              isLoader={isLoader.removeFrom}
              disabled={
                listArray.length === 0 ||
                disabled ||
                Number(inputIndex) > listArray.length - 1 ||
                Number(inputIndex) < 1
              }
            />
          </div>
        </form>
        <ul className={style.list} data-testid="circles">
          {listArray.map((item, index) => {
            return (
              <li
                className={style.element}
                key={index}
                data-testid="circleitem"
              >
                {item.shiftElement && (
                  <Circle
                    extraClass={`${style.smallCircle} ${
                      style[`${item.shiftElement.position}`]
                    }`}
                    letter={item.shiftElement.value}
                    state={item.shiftElement.state}
                    isSmall
                  />
                )}
                <Circle
                  letter={item.value}
                  index={index}
                  head={index === 0 && !item.shiftElement ? "head" : ""}
                  tail={
                    index === listArray.length - 1 && !item.shiftElement
                      ? "tail"
                      : ""
                  }
                  isSmall={false}
                  state={item.state}
                  extraClass="mr-12"
                />
                {index < listArray.length - 1 && (
                  <ArrowIcon
                    fill={
                      item.state !== ElementStates.Changing
                        ? "#0032FF"
                        : "#d252e1"
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
