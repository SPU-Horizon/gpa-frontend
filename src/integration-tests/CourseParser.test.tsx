import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@/testconfig/renderMock";
import { IntegrationPage } from "@/sections";
import axios from "axios";

describe("IntegrationPage", () => {
  it("renders Integration Page", () => {
    render(<IntegrationPage />);
    expect(screen.getByText("Banner Integration")).toBeInTheDocument();
  });

  it("API should return object aligning with the defined Type", async () => {
    // Mock the API call
    const mockResponse = {
      status: 200,
      data: {
        enrollment_year: "2022",
        enrollment_quarter: "Fall",
        graduation_year: "2026",
        graduation_quarter: "Spring",
        field: [["Field 1"], ["Field 2"]],
        classes_taken: ["Class 1", "Class 2"],
      },
    };
    vi.spyOn(axios, "post").mockResolvedValue(mockResponse);

    // Perform the test
    const response = await axios.post(
      "http://localhost:3000/course/parseCourses",
      {}
    );

    // Assertions
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      enrollment_year: expect.any(String),
      enrollment_quarter: expect.any(String),
      graduation_year: expect.any(String),
      graduation_quarter: expect.any(String),
      field: expect.any(Array),
      classes_taken: expect.any(Array),
    });
  });
});
