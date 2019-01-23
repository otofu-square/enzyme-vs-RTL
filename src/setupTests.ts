// NOTE: settings for react-testing-library
// see: https://facebook.github.io/create-react-app/docs/running-tests#option-2-react-testing-library
//
// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import "react-testing-library/cleanup-after-each";
// this adds jest-dom's custom assertions
import "jest-dom/extend-expect";

// NOTE: settings for enzyme
// see: https://facebook.github.io/create-react-app/docs/running-tests#option-1-shallow-rendering
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
