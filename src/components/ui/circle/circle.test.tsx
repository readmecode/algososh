import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("test uiCircle", () => {
  test("without letters", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with letters", () => {
    const tree = renderer.create(<Circle letter={"H"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with head", () => {
    const tree = renderer.create(<Circle head={"head"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with react-element in head", () => {
    const reactElement = <h1>test header</h1>;
    const tree = renderer.create(<Circle head={reactElement} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with tail", () => {
    const tree = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with react-element in tail", () => {
    const reactElement = <h1>test tail</h1>;
    const tree = renderer.create(<Circle tail={reactElement} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with props isSmall={true}", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("type of condition default", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("type of condition changing", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("type of condition modified", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
