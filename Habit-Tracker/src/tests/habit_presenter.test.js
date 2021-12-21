import { HabitPresenter } from "../habit_presenter";

describe("HabitPresenter", () => {
  let presenter;
  let update;

  const habits = [
    { id: 1, name: "Reading", count: 1 },
    { id: 2, name: "Running", count: 0 },
  ];

  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it("Inits with habits", () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it("Increments habit count and call update callback", () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  it("Decrements habit count and call update callback", () => {
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it("Does not set the count value below 0 when decrements", () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it("Delete habit from the list and call update callback", () => {
    presenter.delete(habits[0], update);

    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe("Running");
    checkUpdateIsCalled();
  });

  it("Adds new habits to the list and call update callback", () => {
    presenter.add("Eating", update);

    expect(presenter.getHabits()[2].name).toBe("Eating");
    expect(presenter.getHabits()[2].count).toBe(0);

    checkUpdateIsCalled();
  });

  it("Throws an error when the max habits limit is exceeded", () => {
    presenter.add("Eating", update);

    expect(() => {
      presenter.add("Eating", update);
    }).toThrow(`습관의 갯수는 3개 이상이 될 수 없습니다.`);
  });

  describe("Reset", () => {
    it("Resets all habit count to 0", () => {
      presenter.reset(update);

      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);

      checkUpdateIsCalled();
    });

    it("Does not create new object when count is 0", () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updatedHabits = presenter.getHabits();

      expect(updatedHabits[1]).toBe(habits[1]);

      // expect(updatedHabits[1]).toBe(habits[1]); toEqual()은 {} 안에 있는 값을 비교함
      // toBe()는 객체의 참조 값을 비교함
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
