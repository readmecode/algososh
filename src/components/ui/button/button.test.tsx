import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("test uiButton", () => {
  test("with text", () => {
    const tree = renderer.create(<Button text={"button text"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("locked", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with loader", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("processing a callback in a button", () => {
    window.alert = jest.fn();

    const callback = () => {
      alert("callback");
    };

    // Рендерим компонент
    render(<Button text={"button text"} onClick={callback} />);

    // Находим элемент
    const button = screen.getByText("button text");

    // Имитируем нажатие
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("callback");
  });
});
