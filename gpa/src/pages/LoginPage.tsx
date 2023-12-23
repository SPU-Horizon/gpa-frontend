import { SeattleLanding } from "@/images";
import { GoogleIcon, GpaGold } from "@/icons";

export default function AuthenticationPage() {
  return (
    <div className="flex justify-center items-center h-[50rem] w-full bg-gradient-to-r from-neutral-500 to-black-light">
      <div className="flex w-full md:max-w-sm mx-auto overflow-hidden bg-white-light rounded-lg shadow-lg max-w-3xl">
        <div
          className="md:hidden bg-cover block w-1/2 bg-center"
          style={{
            backgroundImage: `url(${SeattleLanding})`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 ">
          <div className="flex justify-center mx-auto">
            <GpaGold />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 ">
            Welcome back!
          </p>

          <a
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 "
          >
            <GoogleIcon />

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase  hover:underline"
              aria-disabled="true"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b  lg:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 "
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a href="#" className="text-xs text-gray-500  hover:underline">
                Forget Password?
              </a>
            </div>

            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white-light capitalize transition-colors duration-300 transform bg-gold-light rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <a
              href="/register"
              className="text-xs text-gray-500 uppercase  hover:underline"
            >
              or sign up
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
