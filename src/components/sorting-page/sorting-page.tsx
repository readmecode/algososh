import style from "./sorting-page.module.css";
import React, { useState, useEffect } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { makeRandomArr, selectionSort, bubbleSort } from "./sorting";

type TArray = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [Array, setArray] = useState<TArray[]>([]);
  const [sortWay, setSortWay] = useState("choose");

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isLoadAsc, setIsLoadAsc] = useState(false);
  const [isLoadDesc, setIsLoadDesc] = useState(false);

  const getNewArr = () => {
    setArray([...makeRandomArr()]);
  };

  useEffect(() => {
    getNewArr();
  }, []);

  const onChangeSortWay = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSortWay(evt.target.value);
  };

  const handleClick = (direction: Direction) => {
    if (sortWay === "bubble") {
      bubbleSort(
        Array,
        direction,
        setIsLoadDesc,
        setIsLoadAsc,
        setIsDisabledButton,
        setArray
      );
    }
    if (sortWay === "choose") {
      selectionSort(
        Array,
        direction,
        setIsLoadDesc,
        setIsLoadAsc,
        setIsDisabledButton,
        setArray
      );
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.main}>
        <form className={style.form}>
          <div className={style.radioBox}>
            <RadioInput
              label="Выбор"
              value="choose"
              checked={sortWay === "choose"}
              onChange={onChangeSortWay}
              disabled={isDisabledButton}
            />
            <RadioInput
              label="Пузырёк"
              value="bubble"
              checked={sortWay === "bubble"}
              onChange={onChangeSortWay}
              disabled={isDisabledButton}
            />
          </div>
          <div className={style.buttonBox}>
            <Button
              text="По возрастанию"
              linkedList="big"
              disabled={isLoadDesc}
              onClick={() => handleClick(Direction.Ascending)}
              isLoader={isLoadAsc}
              sorting={Direction.Ascending}
            />
            <Button
              text="По убыванию"
              linkedList="big"
              disabled={isLoadAsc}
              onClick={() => handleClick(Direction.Descending)}
              isLoader={isLoadDesc}
              sorting={Direction.Descending}
            />
          </div>
          <div className={style.separate}>
            <Button
              text="Новый массив"
              linkedList="big"
              disabled={isLoadAsc || isLoadDesc}
              onClick={getNewArr}
            />
          </div>
        </form>
        <ul className={style.columnsBox}>
          {Array.map((item, index) => (
            <li key={index}>
              <Column index={item.value} state={item.color} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
