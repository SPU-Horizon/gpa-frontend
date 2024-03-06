import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@/testconfig/renderMock";
import { ClassHistory } from "@/sections";
import axios from "axios";
import { waitFor } from "@testing-library/react";
import useAuthStore from "@/stores/AuthStore";

describe("ClassHistory", () => {
  it("renders Integration Page", () => {
    render(<ClassHistory />);
    expect(screen.getByText("Your Classes")).toBeInTheDocument();
  });
});

it("renders data from API", async () => {
  const mockData = [
    {
      course_id: "CSC101",
      name: "Introduction to Computer Science",
      completion: "In Progress",
    },
    {
      course_id: "MAT202",
      name: "Linear Algebra",
      completion: "Completed",
    },
  ];

  vi.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });

  render(<ClassHistory test={mockData} />);

  await waitFor(() => {
    mockData.forEach((course) => {
      expect(screen.getByText(course.course_id)).toBeInTheDocument();
      expect(screen.getByText(course.name)).toBeInTheDocument();
    });
  });
});
