import * as React from "react";

type FormEvent = React.FormEvent<
  HTMLInputElement | HTMLSelectElement | HTMLFormElement
>;

export interface State {
  name: string;
  fruit: string;
}

export interface Props {
  initialValues?: State;
  onSubmit: (state: State) => void;
}

export class Form extends React.Component<Props, State> {
  state: State = this.props.initialValues || {
    name: "",
    fruit: "coconut"
  };

  handleChange = (e: FormEvent) => {
    // @ts-ignore
    const { name, value } = e.target;
    // @ts-ignore
    this.setState({ [name]: value });
  };

  handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      // NOTE: simulate validation
      if (this.state.name === "") return;

      // NOTE: simulate async logic like API reqeust
      await this.props.onSubmit(this.state);

      console.log(`name: ${this.state.name}, fruit: ${this.state.fruit}`);
    } catch {
      console.log("failed");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Input your name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Pick your favorite flavor:</label>
          <select
            name="fruit"
            value={this.state.fruit}
            onChange={this.handleChange}
          >
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
  }
}
