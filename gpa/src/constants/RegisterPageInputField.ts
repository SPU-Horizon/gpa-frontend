import { InputFieldProps } from "@/components/custom/InputField";

export const RegisterInputFields: InputFieldProps[] = [
  {
    header: "First Name",
    placeholder: "John",
    zodTitle: "firstName",
    type: "text",
    required: true,
  },
  {
    header: "Last Name",
    placeholder: "John",
    zodTitle: "lastName",
    type: "text",
    required: true,
  },

  {
    header: "Email Address",
    placeholder: "johnsnow@gmail.com",
    zodTitle: "email",
    type: "email",
    required: true,
  },
  {
    header: "Password",
    placeholder: "Enter your password",
    zodTitle: "password",
    type: "password",
    required: true,
  },
  {
    header: "Confirm Password",
    placeholder: "Enter your password",
    zodTitle: "confirmPassword",
    type: "password",
    required: true,
  },
];
