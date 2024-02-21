import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render } from "@/testconfig/renderMock";
import { IntegrationPage } from "@/sections";
import axios from "axios";

describe("IntegrationPage", () => {
  it("renders Integration Page", () => {
    render(<IntegrationPage />);
    expect(screen.getByText("Banner Integration")).toBeInTheDocument();
  });
});

it("should connect to the API that parses courses", async () => {
  const responseBlob = await fetch(
    "http://localhost:5173/Alex's UG Degree Check.html"
  );
  const file = new File(
    [await responseBlob.blob()],
    "Alex's UG Degree Check.html"
  );

  console.log(file.size);

  let formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    "http://localhost:3000/course/parseCourses",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  expect(response.status).toBe(200);
});
