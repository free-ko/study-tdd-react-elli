import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import renderer from "react-test-renderer";
import Habit from "../habit";

describe("Habit component", () => {
  const habit = { name: "Habit", count: 4 };
  let HabitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();

    HabitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  it("Renders", () => {
    const component = renderer.create(HabitComponent);

    expect(component.toJSON).toMatchSnapshot();
  });

  describe("Button Click", () => {
    beforeEach(() => {
      render(HabitComponent);
    });

    it('Calls onIncrement when clicking "increment" button', () => {
      const button = screen.getByTitle("increase");
      userEvent.click(button);

      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it('Calls onDecrement when clicking "decrement" button', () => {
      const button = screen.getByTitle("decrease");
      userEvent.click(button);

      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it('Calls onDelete when clicking "delete" button', () => {
      const button = screen.getByTitle("delete");
      userEvent.click(button);

      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
