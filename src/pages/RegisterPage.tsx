import { useState } from "react";
import { Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Laptop } from "@/images";
import { ArrowRight } from "@/icons";
import { OptionDropdown } from "@/components/custom";
import RegisterPageHeader from "@/components/RegisterAndLogin/RegisterPageHeader";

import {
  MajorOptions,
  RegisterInputFields,
  StudentYearOptions,
} from "@/constants";

import { useAuthStore } from "@/stores/AuthStore";

const registerSchema = z
  .object({
    firstName: z.string().min(1).max(18),
    lastName: z.string().min(1).max(18),
    email: z.string().email(),
    password: z.string().min(9, "Password must be at least 9 characters."),
    confirmPassword: z
      .string()
      .min(9, "Password must be at least 9 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must be matching match.",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useAuthStore();
  const [value, setValue] = useState("");
  const [year, setYear] = useState("");
  const [isPassword, setInputType] = useState(true);

  const submitHandler = async () => {
    isSubmitting ? toast.loading("Loading...") : toast.dismiss();

    const res = await registerUser({
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      email: getValues().email,
      password: getValues().password,
      Major: value,
      Year: year,
    });

    if (!res) {
      toast.error("An Error Occured.");
    } else {
      toast.success("Validation should be sent to your Email!");
    }
    console.log(getValues());
    reset();
    setValue("");
    setYear("");
  };

  if (errors.password) {
    toast.error("Password must be at least 9 characters.");
  }

  if (errors.email) {
    toast.error("Invalid email address.");
  }

  return (
    <section className="">
      <div className="flex justify-center min-h-screen dark:bg-black-light ">
        <div
          className="md:hidden bg-cover bg-center block w-2/5"
          style={{ backgroundImage: `url(${Laptop})` }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 md:p-2 ">
          <div className="w-full md:pt-12">
            <RegisterPageHeader />

            <form
              className="grid md:grid-cols-1 gap-6 mt-8 grid-cols-2"
              onSubmit={handleSubmit(() => {
                submitHandler();
              })}
              id="registerForm"
            >
              {RegisterInputFields.map((inputField, i) => (
                <div key={i}>
                  <>
                    <label className="block mb-2 text-md text-gray-600 dark:text-white-light ">
                      {inputField.header} {inputField.required ? "*" : ""}
                    </label>

                    {inputField.type === "password" ? (
                      <div className="flex gap-4">
                        <input
                          {...register(inputField.zodTitle)}
                          type={isPassword ? "password" : "text"}
                          placeholder={inputField.placeholder}
                          className="block w-full px-5 py-3 dark:text-white-light dark:placeholder-white-light text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <div
                          onClick={() => setInputType(!isPassword)}
                          className="self-center pt-1"
                        >
                          <Eye className="opacity-75" />
                        </div>
                      </div>
                    ) : (
                      <input
                        {...register(inputField.zodTitle)}
                        type={inputField.type}
                        placeholder={inputField.placeholder}
                        className="block w-full px-5 py-3 mt-2 dark:placeholder-white-light dark:text-white-light text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    )}
                  </>
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="block text-md text-gray-600 dark:text-white-light">
                  Major or Field of Study
                </label>
                <OptionDropdown
                  title="Major"
                  value={value}
                  setValue={setValue}
                  optionList={MajorOptions}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-md text-gray-600 dark:text-white-light ">
                  Current Year
                </label>
                <OptionDropdown
                  title="Year"
                  value={year}
                  setValue={setYear}
                  optionList={StudentYearOptions}
                />
              </div>

              <button
                type="submit"
                className="md:my-10 self-end h-[50px] flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-gold-light rounded-lg hover:bg-black-base hover:text-white-light focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span className="dark:text-white-light ">Sign Up </span>
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
