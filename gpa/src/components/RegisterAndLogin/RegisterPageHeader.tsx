import React from "react";

export default function RegisterPageHeader() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize md:text-center ">
        Sign up for GPA Today
      </h1>

      <p className="mt-4 text-gray-500 md:text-center ">
        Let’s get you set up for your account with some basic information.
      </p>

      <div className="mt-6">
        <h1 className="text-gray-500 md:text-center ">
          For Admin Access - Contact us at:{" "}
          <a>graduationplanningapp@gmail.com</a>
        </h1>
      </div>
    </>
  );
}
