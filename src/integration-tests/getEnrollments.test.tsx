import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@/testconfig/renderMock";
import { ClassHistory } from "@/sections";
import axios from "axios";
import { waitFor } from "@testing-library/react";

describe("ClassHistory", () => {
  it("renders Integration Page", () => {
    render(<ClassHistory />);
    expect(screen.getByText("Your Classes")).toBeInTheDocument();
  });
});

it("can render course cards from the database", async (useAuthStore) => {
  const { getByText } = render(<ClassHistory />);

  const email = "test@gmail.com";

  const res = await axios
    .get(`http://localhost:3000/course/getCourses?email=${email}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  res.map(async (course: any) => {
    await waitFor(() => getByText(course["course_id"]));
  });
});
