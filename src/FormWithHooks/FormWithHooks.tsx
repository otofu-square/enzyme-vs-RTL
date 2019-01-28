import React, { useState } from "react";

type FormEvent = React.FormEvent<
  HTMLInputElement | HTMLSelectElement | HTMLFormElement
>;

export interface Values {
  name: string;
  fruit: string;
}

export interface Props {
  initialValues?: Values;
  onSubmit: (values: Values) => void;
}

export const FormWithHooks: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [name, setName] = useState(initialValues ? initialValues.name : "");
  const [fruit, setFruit] = useState(
    initialValues ? initialValues.fruit : "coconut"
  );

  const handleChange = (e: FormEvent) => {
    // @ts-ignore NOTE: target has no name attributes type
    if (e.target.name === "name") setName(e.target.value);
    // @ts-ignore NOTE: target has no name attributes type
    if (e.target.name === "fruit") setFruit(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      // NOTE: simulate validation
      if (name === "") return;

      // NOTE: simulate async logic like API reqeust
      await onSubmit({ name, fruit });

      console.log(`name: ${name}, fruit: ${fruit}`);
    } catch {
      console.log("failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Input your name:</label>
        <input type="text" name="name" value={name} onChange={handleChange} />
      </div>
      <div>
        <label>Pick your favorite flavor:</label>
        <select name="fruit" value={fruit} onChange={handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};
