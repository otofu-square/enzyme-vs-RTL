import * as React from "react";
import { withState } from "recompose";
import { fireEvent, render } from "react-testing-library";

const STATE_NAME = "counter";
const STATE_UPDATER_NAME = "setCounter";

type Props = {
  counter: number;
  setCounter: (_: number) => number;
};

const MockComponent: React.FC<Props> = ({ counter, setCounter }) => (
  <div>
    <p>{counter}</p>
    <button onClick={() => setCounter(counter + 1)}>Increment</button>
    <button onClick={() => setCounter(counter - 1)}>Decrement</button>
  </div>
);

describe("withState", () => {
  it("provides state prop & state handler prop", () => {
    const enhancer = withState(STATE_NAME, STATE_UPDATER_NAME, 0);
    const EnhancedComponent = enhancer(MockComponent);
    const { container } = render(<EnhancedComponent />);

    const counter = container.querySelectorAll("p")[0];
    const incrementButton = container.querySelectorAll("button")[0];
    const decrementButton = container.querySelectorAll("button")[1];

    // NOTE: check initial state
    expect(counter.textContent).toBe("0");

    // NOTE: click incrementButton
    fireEvent.click(incrementButton);
    expect(counter.textContent).toBe("1");
    fireEvent.click(incrementButton);
    expect(counter.textContent).toBe("2");

    // NOTE: click decrementButton
    fireEvent.click(decrementButton);
    expect(counter.textContent).toBe("1");
    fireEvent.click(decrementButton);
    expect(counter.textContent).toBe("0");
  });
});
