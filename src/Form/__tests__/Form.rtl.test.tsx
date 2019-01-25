import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { wait } from "dom-testing-library";
import { Form } from "../Form";

describe("Form", () => {
  describe("static view", () => {
    it("renders correctly", () => {
      const { container } = render(<Form onSubmit={jest.fn()} />);

      const nameInput = container.querySelectorAll('input[type="text"]');
      const submitButton = container.querySelectorAll('input[type="submit"]');
      const fruitSelect = container.querySelectorAll("select");
      const fruitOptions = container.querySelectorAll("option");

      expect(nameInput).toHaveLength(1);
      expect(fruitSelect).toHaveLength(1);
      expect(submitButton).toHaveLength(1);

      expect(fruitOptions).toHaveLength(4);
      expect(fruitOptions[0].value).toBe("grapefruit");
      expect(fruitOptions[0].textContent).toBe("Grapefruit");
      expect(fruitOptions[1].value).toBe("lime");
      expect(fruitOptions[1].textContent).toBe("Lime");
      expect(fruitOptions[2].value).toBe("coconut");
      expect(fruitOptions[2].textContent).toBe("Coconut");
      expect(fruitOptions[3].value).toBe("mango");
      expect(fruitOptions[3].textContent).toBe("Mango");
    });
  });

  describe("initialValues", () => {
    it("renders correctly with no initialValues", () => {
      const { container } = render(<Form onSubmit={jest.fn()} />);
      const nameInput = container.querySelectorAll('input[type="text"]');
      const fruitSelect = container.querySelectorAll("select");

      // @ts-ignore NOTE: HTMLElement type has no value attribute
      expect(nameInput[0].value).toBe("");
      expect(fruitSelect[0].value).toBe("coconut");
    });

    it("renders correctly with initialValues", () => {
      const initialValues = {
        name: "initial name",
        fruit: "mango"
      };
      const { container } = render(
        <Form initialValues={initialValues} onSubmit={jest.fn()} />
      );
      const nameInput = container.querySelectorAll('input[type="text"]');
      const fruitSelect = container.querySelectorAll("select");

      // @ts-ignore NOTE: HTMLElement type has no value attribute
      expect(nameInput[0].value).toBe(initialValues.name);
      expect(fruitSelect[0].value).toBe(initialValues.fruit);
    });
  });

  describe("onSubmit", () => {
    it("is called when form is submitted with valid inputs", async () => {
      const onSubmit = jest.fn();
      const { container } = render(<Form onSubmit={onSubmit} />);
      const nameInput = container.querySelectorAll('input[type="text"]');
      const fruitSelect = container.querySelectorAll("select");
      const submitButton = container.querySelectorAll('input[type="submit"]');

      // NOTE: simulate user inputs
      // see: https://testing-library.com/docs/api-events#fireevent-eventname
      fireEvent.change(nameInput[0], {
        target: { name: "name", value: "my name" }
      });
      fireEvent.change(fruitSelect[0], {
        target: { name: "fruit", value: "lime" }
      });

      fireEvent.click(submitButton[0]);
      await wait();

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ name: "my name", fruit: "lime" });
    });

    it("is not called when form is submitted with initial state", async () => {
      const onSubmit = jest.fn();
      const { container } = render(<Form onSubmit={onSubmit} />);
      const submitButton = container.querySelectorAll('input[type="submit"]');

      // NOTE: simulate click event
      // see: https://testing-library.com/docs/api-events#fireevent-eventname
      fireEvent.click(submitButton[0]);
      await wait();

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
