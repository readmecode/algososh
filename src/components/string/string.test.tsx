import { convertString } from "./utils";
import { ElementStates } from "../../types/element-states";

describe("testing reversals of string", () => {
  const setStrArr = jest.fn();
  const setLoader = jest.fn();

  test("with an even number", async () => {
    const str = "Hi";
    const convertedString = "iH";

    await convertString(str, setLoader, setStrArr);

    expect(setStrArr).toHaveBeenLastCalledWith(
      convertedString
        .split("")
        .map((el) => ({ value: el, color: ElementStates.Modified }))
    );
  });

  test("with an odd number", async () => {
    const str = "Hello";
    const convertedString = "olleH";
    await convertString(str, setLoader, setStrArr);

    expect(setStrArr).toHaveBeenLastCalledWith(
      convertedString
        .split("")
        .map((el) => ({ value: el, color: ElementStates.Modified }))
    );
  });

  test("with single character", async () => {
    const str = "H";
    const convertedString = "H";
    await convertString(str, setLoader, setStrArr);

    expect(setStrArr).toHaveBeenLastCalledWith(
      convertedString
        .split("")
        .map((el) => ({ value: el, color: ElementStates.Modified }))
    );
  });

  test("with empty string", async () => {
    const str = "";
    await convertString(str, setLoader, setStrArr);
    expect(setStrArr).toHaveBeenCalledTimes(0);
  });
});
