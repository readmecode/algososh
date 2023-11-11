import { selectionSort, bubbleSort } from "./sorting";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const oneElementArray = [
  {
    value: 0,
    color: ElementStates.Modified,
  },
];

const array = [
  { value: 2, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
];

const sortedArrayAsc = [
  { value: 1, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
];

const sortedArrayDesc = [
  { value: 4, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
];

const setIsLoadDesc = jest.fn();
const setIsLoadAsc = jest.fn();
const setIsDisabledButton = jest.fn();
const setArray = jest.fn();

jest.setTimeout(10000);

describe("select sort asc algorithm", () => {
  test("with empty arr", async () => {
    await selectionSort(
      [],
      Direction.Ascending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  test("with one element in arr", async () => {
    await selectionSort(
      oneElementArray,
      Direction.Ascending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  test("with some elements in arr", async () => {
    await selectionSort(
      array,
      Direction.Ascending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenLastCalledWith(sortedArrayAsc);
  });
});

describe("select sort desc algorithm", () => {
  test("with empty arr", async () => {
    await selectionSort(
      [],
      Direction.Descending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  test("with one element in arr", async () => {
    await selectionSort(
      oneElementArray,
      Direction.Descending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  test("with some elements in arr", async () => {
    await selectionSort(
      array,
      Direction.Descending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenLastCalledWith(sortedArrayDesc);
  });
});

describe("bubble sort asc algorithm", () => {
  it("with empty arr", async () => {
    await bubbleSort(
      [],
      Direction.Ascending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("with one element in arr", async () => {
    await bubbleSort(
      oneElementArray,
      Direction.Ascending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("with some elements in arr", async () => {
    await bubbleSort(
      array,
      Direction.Ascending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenLastCalledWith(sortedArrayAsc);
  });
});

describe("bubble sort desc algorithm", () => {
  it("with empty arr", async () => {
    await bubbleSort(
      [],
      Direction.Descending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("with one element in arr", async () => {
    await bubbleSort(
      oneElementArray,
      Direction.Descending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it("with some elements in arr", async () => {
    await bubbleSort(
      array,
      Direction.Descending,
      setIsLoadDesc,
      setIsLoadAsc,
      setIsDisabledButton,
      setArray
    );
    expect(setArray).toHaveBeenLastCalledWith(sortedArrayDesc);
  });
});
