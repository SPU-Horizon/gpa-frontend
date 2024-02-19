import { InputFieldProps } from "@/components/custom/InputField";

const RegisterInputFields: InputFieldProps[] = [
  {
    header: "First Name",
    placeholder: "Ex: John",
    zodTitle: "firstName",
    type: "text",
    required: true,
  },
  {
    header: "Last Name",
    placeholder: "Ex: Doe",
    zodTitle: "lastName",
    type: "text",
    required: true,
  },

  {
    header: "Email Address",
    placeholder: "Ex: johndoe@gmail.com",
    zodTitle: "email",
    type: "email",
    required: true,
  },
  {
    header: "Password",
    placeholder: "Enter Password",
    zodTitle: "password",
    type: "password",
    required: true,
  },
  {
    header: "Confirm Password",
    placeholder: "Confirm Password",
    zodTitle: "confirmPassword",
    type: "password",
    required: true,
  },
];

export default RegisterInputFields;
