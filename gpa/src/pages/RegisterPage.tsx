import { Laptop } from "@/images";
//meraki ui
import { RegisterInputFields } from "@/constants/InputFieldContent";
import InputField from "@/components/RegisterPage/InputField";
import { ArrowRight } from "@/icons";

export default function RegisterPage() {
  return (
    <section className="bg-white-light ">
      <div className="flex justify-center min-h-screen">
        <div
          className="md:hidden bg-cover bg-center block w-2/5"
          style={{ backgroundImage: `url(${Laptop})` }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 md:p-2">
          <div className="w-full md:pt-12">
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

            <form className="grid md:grid-cols-1 gap-6 mt-8 grid-cols-2">
              {RegisterInputFields.map((inputField, i) => (
                <InputField
                  key={i * 4}
                  header={inputField.header}
                  placeholder={inputField.placeholder}
                ></InputField>
              ))}

              <button className="md:mb-6 flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-gold-light rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Sign Up </span>
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
