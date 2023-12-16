import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

// Arrange the Test

// Act -> We basically act something on the page and test it - may not always have it

//Then we expect something to happen

describe("App", () => {
  it("renders GPA in the Works", () => {
    render(<App />);
    expect(screen.getByText("Among Uss.")).toBeInTheDocument();
  });
});
