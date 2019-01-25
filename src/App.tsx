import * as React from "react";
import { Form, Props } from "./Form";

const handleSubmit: Props["onSubmit"] = state => {
  console.log(state);
};

export const App = () => <Form onSubmit={handleSubmit} />;
