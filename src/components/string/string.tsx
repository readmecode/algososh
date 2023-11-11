import style from "./string.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { convertString } from "./utils";

type TArray = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [stringArr, setString] = useState<Array<TArray>>([]);
  const [loader, setLoader] = useState(false);

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    convertString(input, setLoader, setString);
  };

  return (
    <SolutionLayout title="Строка">
      <div>
        <form className={style.form} onSubmit={submit}>
          <Input
            maxLength={11}
            isLimitText={true}
            value={input}
            onChange={onChangeInput}
          />
          <Button
            type="submit"
            text="Развернуть"
            isLoader={loader}
            disabled={!input.length}
          />
        </form>
        <div className={style.letterList}>
          {stringArr?.map((item, index) => (
            <li key={index}>
              <Circle letter={item.value} state={item.color} />
            </li>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
