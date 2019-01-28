import * as React from "react";
import { withState } from "recompose";
import { mount } from "enzyme";

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
    const wrapper = mount(<EnhancedComponent />);

    const counter = wrapper.find("p");
    const incrementButton = wrapper.find("button").at(0);
    const decrementButton = wrapper.find("button").at(1);

    // NOTE: check initial state
    expect(counter.text()).toBe("0");

    // NOTE: click incrementButton
    incrementButton.simulate("click");
    expect(counter.text()).toBe("1");
    incrementButton.simulate("click");
    expect(counter.text()).toBe("2");

    // NOTE: click decrementButton
    decrementButton.simulate("click");
    expect(counter.text()).toBe("1");
    decrementButton.simulate("click");
    expect(counter.text()).toBe("0");
  });
});
