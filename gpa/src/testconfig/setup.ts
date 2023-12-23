/* 

import "@testing-library/jest-dom/vitest";: This line imports the vitest library's Jest DOM extensions. 
These extensions provide additional matchers and utilities for testing DOM elements.

import * as matchers from "@testing-library/jest-dom/matchers";: 
This line imports all the matchers from the @testing-library/jest-dom/matchers module. 
Matchers are functions that allow you to make assertions in your tests.

import { expect } from "vitest"; 
This line imports the expect function from the vitest library. 
The expect function is used to make assertions in your tests, allowing you to check if certain conditions are met.

expect.extend(matchers); 
This line extends the expect function with the matchers imported in line 3. 
By extending expect, you can use the matchers provided by @testing-library/jest-dom in your tests.

Overall, these lines of code are setting up the necessary dependencies and 
configurations to use the vitest library for testing and to leverage the additional matchers and 
utilities provided by the @testing-library/jest-dom package. 

*/

import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

import { expect } from "vitest";

expect.extend(matchers);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
