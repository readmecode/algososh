import React, { ChangeEvent, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import listPageStyles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./classes";
import { getRandomInt } from "../sorting-page/sorting-page.utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";

type TItem = {
  value: string;
  color: ElementStates;
};

enum ButtonName {
  AddToHead = "add to head",
  AddToTail = "add to tail",
  DeleteFromTheHead = "delete from the head",
  DeleteFromTheTail = "delete from to tail",
  AddByIndex = "add by index",
  DeleteByIndex = "delete by index",
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [ind, setInd] = useState("");
  const [loading, setLoading] = useState(false);
  const [addToHeadOperation, setAddToHeadOperation] = useState(false);
  const [addToTailOperation, setAddToTailOperation] = useState(false);
  const [deleteFromTheHeadOperation, setDeleteFromTheHeadOperation] =
    useState(false);
  const [deleteFromTheTailOperation, setDeleteFromTheTailOperation] =
    useState(false);
  const [addByIndexOperation, setAddByIndexOperation] = useState(false);
  const [deleteByIndexOperation, setDeleteByIndexOperation] = useState(false);
  const [inputValueInd, setInputValueInd] = useState<number>();
  const [buttonName, setButtonName] = useState("");
  const [circleTempValue, setCircleTempValue] = useState("");

  const list = useMemo(
    () =>
      new LinkedList<string>(
        Array.from({ length: 4 }, () => getRandomInt(0, 99).toString())
      ),
    []
  );

  const [arr, setArr] = useState<TItem[]>(list.getArrWithColor());

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInd(e.target.value);
  };

  const addIntoHead = async () => {
    if (inputValue && list.listLength < 6) {
      setButtonName(ButtonName.AddToHead);
      setLoading(true);
      setInputValueInd(0);
      setAddToHeadOperation(true);
      await delay(SHORT_DELAY_IN_MS);
      list.prepend(inputValue);
      setAddToHeadOperation(false);
      const newArr = list.getArrWithColor();
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
    setButtonName("");
  };

  const addIntoTail = async () => {
    if (inputValue && list.listLength < 6) {
      setButtonName(ButtonName.AddToTail);
      setLoading(true);
      setInputValueInd(list.listLength - 1);
      setAddToTailOperation(true);
      await delay(SHORT_DELAY_IN_MS);
      list.append(inputValue);
      setAddToTailOperation(false);
      const newArr = list.getArrWithColor();
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    }
    setInputValue("");
    setLoading(false);
    setButtonName("");
  };

  const deleteFromTheHead = async () => {
    if (list.listLength > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[0].value);
      setButtonName(ButtonName.DeleteFromTheHead);
      setLoading(true);
      setDeleteFromTheHeadOperation(true);
      setInputValueInd(0);
      newArr[0].value = "";
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      list.deleteHead();
      setDeleteFromTheHeadOperation(false);
      setArr(list.getArrWithColor());
    }
    setLoading(false);
    setButtonName("");
  };

  const deleteFromTheTail = async () => {
    if (list.listLength > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[newArr.length - 1].value);
      setButtonName(ButtonName.DeleteFromTheTail);
      setLoading(true);
      setDeleteFromTheTailOperation(true);
      setInputValueInd(list.listLength - 1);
      newArr[newArr.length - 1].value = "";
      setArr(newArr);
      await delay(SHORT_DELAY_IN_MS);
      list.deleteTail();
      setDeleteFromTheTailOperation(false);
      setArr(list.getArrWithColor());
    }
    setLoading(false);
    setButtonName("");
  };

  const addByIndex = async () => {
    if (Number(ind) < 5 && list.listLength < 6) {
      setButtonName(ButtonName.AddByIndex);
      setLoading(true);
      setAddByIndexOperation(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(ind); i++) {
        setInputValueInd(i);
        await delay(SHORT_DELAY_IN_MS);
        if (i < Number(ind)) {
          newArr[i].color = ElementStates.Changing;
          setArr(newArr);
        }
      }
      setAddByIndexOperation(false);
      setInputValueInd(Number(""));
      list.addByIndex(inputValue, Number(ind));
      const finalArr = list.getArrWithColor();
      finalArr[Number(ind)].color = ElementStates.Modified;

      setArr(finalArr);
      await delay(SHORT_DELAY_IN_MS);
      finalArr[Number(ind)].color = ElementStates.Default;
      setArr(finalArr);
    }
    setLoading(false);
    setInputValue("");
    setInd("");
    setButtonName("");
  };

  const deleteByIndex = async () => {
    if (Number(ind) < list.listLength && Number(ind) < 7) {
      setButtonName(ButtonName.DeleteByIndex);
      setLoading(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(ind); i++) {
        await delay(SHORT_DELAY_IN_MS);
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      }
      await delay(SHORT_DELAY_IN_MS);
      setCircleTempValue(newArr[Number(ind)].value);
      newArr[Number(ind)].value = "";
      setDeleteByIndexOperation(true);
      newArr[Number(ind)].color = ElementStates.Default;
      setInputValueInd(Number(ind));
      await delay(SHORT_DELAY_IN_MS);
      list.deleteByIndex(Number(ind));
      setArr(list.getArrWithColor());
      setDeleteByIndexOperation(false);
      setLoading(false);
      setButtonName("");
      setInd("");
    }
  };

  const showHead = (index: number) => {
    if (index === 0 && !addToHeadOperation && !addByIndexOperation) {
      return "head";
    } else if (index === 0 && addByIndexOperation && inputValueInd !== 0) {
      return "head";
    } else {
      return "";
    }
  };

  const showTail = (index: number) => {
    if (
      index === arr.length - 1 &&
      !deleteFromTheTailOperation &&
      !deleteByIndexOperation
    ) {
      return "tail";
    } else if (arr.length === 1) {
      return "";
    } else if (deleteByIndexOperation && index === arr.length - 1) {
      return "";
    } else {
      return "";
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={listPageStyles.mainContainer}>
        <div className={listPageStyles.controlContainer}>
          <section className={listPageStyles.section}>
            <Input
              placeholder="Введите значение"
              maxLength={4}
              isLimitText={true}
              value={inputValue}
              onChange={onInputChange}
              disabled={loading}
            />
            <div className={listPageStyles.button}>
              <Button
                text="Добавить в head"
                onClick={addIntoHead}
                isLoader={buttonName === ButtonName.AddToHead && loading}
                disabled={inputValue === "" || loading ? true : false}
              />
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Добавить в tail"
                onClick={addIntoTail}
                isLoader={buttonName === ButtonName.AddToTail && loading}
                disabled={inputValue === "" || loading ? true : false}
              />
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Удалить из head"
                onClick={deleteFromTheHead}
                isLoader={
                  buttonName === ButtonName.DeleteFromTheHead && loading
                }
                disabled={loading}
              />
            </div>
            <div className={listPageStyles.button}>
              <Button
                text="Удалить из tail"
                onClick={deleteFromTheTail}
                isLoader={
                  buttonName === ButtonName.DeleteFromTheTail && loading
                }
                disabled={loading}
              />
            </div>
          </section>
          <section className={listPageStyles.section}>
            <div className={listPageStyles.input}>
              <Input
                placeholder="Введите индекс"
                max={5}
                min="0"
                type="number"
                value={ind}
                onChange={onIndChange}
                disabled={loading}
              />
            </div>
            <Button
              text="Добавить по индексу"
              onClick={addByIndex}
              isLoader={buttonName === ButtonName.AddByIndex && loading}
              disabled={!inputValue || !ind || loading ? true : false}
            />
            <Button
              text="Удалить по индексу"
              onClick={deleteByIndex}
              isLoader={buttonName === ButtonName.DeleteByIndex && loading}
              disabled={ind === "" || loading ? true : false}
            />
          </section>
        </div>
        <ul className={listPageStyles.circlesBox}>
          {arr.map((item, index) => (
            <li className={listPageStyles.circleCont} key={index}>
              {loading === true &&
                (addToHeadOperation === true ||
                  addToTailOperation === true ||
                  addByIndexOperation === true) &&
                index === inputValueInd && (
                  <div className={listPageStyles.smallCircleTop}>
                    <Circle
                      isSmall
                      letter={inputValue}
                      state={ElementStates.Changing}
                    />
                  </div>
                )}
              {loading === true &&
                (deleteFromTheHeadOperation === true ||
                  deleteFromTheTailOperation === true ||
                  deleteByIndexOperation === true) &&
                index === inputValueInd && (
                  <div className={listPageStyles.smallCircleBottom}>
                    <Circle
                      isSmall
                      letter={circleTempValue}
                      state={ElementStates.Changing}
                    />
                  </div>
                )}
              {arr.length - 1 !== index && (
                <div className={listPageStyles.arrow}>
                  <ArrowIcon />
                </div>
              )}
              <div className={listPageStyles.bigCircle}>
                <Circle
                  index={index}
                  head={showHead(index)}
                  tail={showTail(index)}
                  letter={item.value}
                  state={item.color}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
