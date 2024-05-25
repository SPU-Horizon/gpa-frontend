import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Laptop } from "@/images";
import { ArrowRight } from "@/icons";
import RegisterPageHeader from "@/components/RegisterAndLogin/RegisterPageHeader";

import { RegisterInputFields } from "@/constants";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/AuthStore";
import { TextInput, PasswordInput } from "@mantine/core";

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

  const navigate = useNavigate();

  const { registerUser } = useAuthStore();

  const submitHandler = async () => {
    isSubmitting ? toast.loading("Loading...") : toast.dismiss();

    const res = await registerUser({
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      email: getValues().email,
      password: getValues().password,
    });

    if (res == 1) {
      toast.error("An Error Occured While Registering!");
    } else if (
      getValues().password === "" ||
      getValues().confirmPassword === ""
    ) {
      toast.error("Please Complete Password Fields!");
    } else if (res == 2) {
      toast.error("Email Already Exists");
    } else {
      toast.success("Validation should be sent to your Email!");
      navigate("/sign-in");
    }

    reset();
  };

  return (
    <section>
      <div className="flex justify-center min-h-screen dark:bg-black-light ">
        {/* Image on the Left Size */}
        <div
          className="md:hidden bg-cover bg-center block w-2/5"
          style={{ backgroundImage: `url(${Laptop})` }}
        />

        {/* Form Section on the right side of the page */}
        <div className="flex bg-white items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 md:p-2 ">
          <div className="w-full md:pt-12">
            <RegisterPageHeader />

            {/* Form Component */}
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
                      <PasswordInput
                        {...register(inputField.zodTitle)}
                        placeholder={inputField.placeholder}
                        classNames={{
                          input:
                            "font-avenir text-md w-full h-12 bg-gray-100 dark:bg-black-light dark:text-white-light dark:placeholder-white-light text-gray-700 placeholder-gray-400 border border-gray-500 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40",
                          required: "text-red-400",
                        }}
                      />
                    ) : (
                      <TextInput
                        {...register(inputField.zodTitle)}
                        type={inputField.type}
                        placeholder={inputField.placeholder}
                        required
                        classNames={{
                          input:
                            "font-avenir text-md w-full h-12 bg-gray-100 dark:bg-black-light dark:text-white-light dark:placeholder-gray-400 text-gray-700 placeholder-gray-500 border border-gray-500 rounded-lg focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40",
                        }}
                      />
                    )}
                  </>
                </div>
              ))}

              <button
                type="submit"
                className="md:my-10 self-end h-[50px] flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-black-base hover:text-white-light focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
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
