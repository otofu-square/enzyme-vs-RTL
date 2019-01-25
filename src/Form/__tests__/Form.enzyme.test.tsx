import * as React from "react";
import { shallow } from "enzyme";
import { Form } from "../Form";

describe("Form", () => {
  describe("static view", () => {
    const wrapper = shallow(<Form onSubmit={jest.fn()} />);
    const nameInput = wrapper.find('input[type="text"]');
    const submitButton = wrapper.find('input[type="submit"]');
    const fruitSelect = wrapper.find("select");
    const fruitOptions = wrapper.find("option");

    expect(nameInput).toHaveLength(1);
    expect(fruitSelect).toHaveLength(1);
    expect(submitButton).toHaveLength(1);

    expect(fruitOptions).toHaveLength(4);
    expect(fruitOptions.at(0).prop("value")).toBe("grapefruit");
    expect(fruitOptions.at(0).text()).toBe("Grapefruit");
    expect(fruitOptions.at(1).prop("value")).toBe("lime");
    expect(fruitOptions.at(1).text()).toBe("Lime");
    expect(fruitOptions.at(2).prop("value")).toBe("coconut");
    expect(fruitOptions.at(2).text()).toBe("Coconut");
    expect(fruitOptions.at(3).prop("value")).toBe("mango");
    expect(fruitOptions.at(3).text()).toBe("Mango");
  });

  describe("initialValues", () => {
    it("renders correctly with no initialValues", () => {
      const wrapper = shallow(<Form onSubmit={jest.fn()} />);
      const nameInput = wrapper.find('input[type="text"]');
      const fruitSelect = wrapper.find("select");

      expect(nameInput.prop("value")).toBe("");
      expect(fruitSelect.prop("value")).toBe("coconut");
    });

    it("renders correctly with initialValues", () => {
      const initialValues = {
        name: "initial name",
        fruit: "mango"
      };
      const wrapper = shallow(
        <Form initialValues={initialValues} onSubmit={jest.fn()} />
      );
      const nameInput = wrapper.find('input[type="text"]');
      const fruitSelect = wrapper.find("select");

      expect(nameInput.prop("value")).toBe(initialValues.name);
      expect(fruitSelect.prop("value")).toBe(initialValues.fruit);
    });
  });

  describe("onSubmit", () => {
    it("is called when form is submitted with valid inputs", async () => {
      const onSubmit = jest.fn();
      const wrapper = shallow(<Form onSubmit={onSubmit} />);
      const form = wrapper.find("form");
      const nameInput = wrapper.find('input[type="text"]');
      const fruitSelect = wrapper.find("select");

      // NOTE: simulate user inputs
      // see: https://github.com/airbnb/enzyme/issues/76
      nameInput.simulate("change", {
        target: { name: "name", value: "my name" }
      });
      fruitSelect.simulate("change", {
        target: { name: "fruit", value: "lime" }
      });

      // NOTE: simulate click event on submit button
      // see: https://github.com/airbnb/enzyme/issues/897
      const preventDefault = jest.fn();
      form.simulate("submit", { preventDefault });

      // NOTE: workaround for waiting onSubmit promise resolved by stacking event loop queue
      // see: https://github.com/airbnb/enzyme/issues/346
      wrapper.update();
      await new Promise(resolve => setImmediate(resolve));

      expect(preventDefault).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ name: "my name", fruit: "lime" });
    });

    it("is not called when form is submitted with initial state", async () => {
      const onSubmit = jest.fn();
      const wrapper = shallow(<Form onSubmit={onSubmit} />);
      const form = wrapper.find("form");

      // NOTE: simulate click event on submit button
      // see: https://github.com/airbnb/enzyme/issues/897
      form.simulate("submit");

      // NOTE: workaround for waiting onSubmit promise resolved by stacking event loop queue
      // see: https://github.com/airbnb/enzyme/issues/346
      wrapper.update();
      await new Promise(resolve => setImmediate(resolve));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
