
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
  const responseBlob = await fetch("http://localhost:5173/M&MReqsPage.html");

  const k = await responseBlob.blob();
  const text = await k.text();
  const formData = new FormData();
  const file = new File([text], "M&MReqsPage.html", { type: "text/html" });
  formData.append("file", file);

  type resData = {
    enrollment_year: string;
    enrollment_quarter: string;
    graduation_year: string;
    graduation_quarter: string;
    field: any[][];
    classes_taken: any[];
  };

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
  expect(response.data.data).toMatchObject<resData>({
    enrollment_year: expect.any(String),
    enrollment_quarter: expect.any(String),
    graduation_year: expect.any(String),
    graduation_quarter: expect.any(String),
    field: expect.any(Array),
    classes_taken: expect.any(Array),
  });

  expect(response.data.data.student_id).toBeNull();
});

