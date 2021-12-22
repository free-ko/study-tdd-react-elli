import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitAddForm from "../habitAddForm";
import renderer from "react-test-renderer";

describe("HabitAddForm", () => {
  it("Renders", () => {
    // 스냅샷 테스트를 진행
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Form Submit", () => {
    let onAdd;
    let input;
    let button;

    beforeEach(() => {
      onAdd = jest.fn();
      render(<HabitAddForm onAdd={onAdd} />);
      input = screen.getByPlaceholderText("Habit");
      button = screen.getByText("Add");
    });

    it("Calls onAdd when button is clicked and valid habit is entered", () => {
      // input에 다가 원하는 습관의 이름을 타이핑 한 다음에
      // add라는 버튼을 클릭하면
      // onAdd가 input에 입력된 이름과 함께 호출되어야 함!
      userEvent.type(input, "New Habit");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledWith("New Habit");
    });

    it("Does not call onAdd when the habit is empty", () => {
      userEvent.type(input, "");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
