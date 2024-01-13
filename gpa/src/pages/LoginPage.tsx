import { SeattleLanding } from "@/images";
import { GoogleIcon, GpaGold } from "@/icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthStore } from "@/stores/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters."),
});

export default function AuthenticationPage() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { signIn, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const submitHandler = async () => {
    const res = await signIn(getValues().email, getValues().password);
    if (!res) {
      toast.error("Invalid credentials.");
    } else {
      toast.success("Signing In - Welcome!");
    }
    reset();
  };

  if (errors.email) {
    toast.error("Please Enter a Valid Email Address");
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center h-full w-full bg-gradient-to-r from-neutral-500 to-black-light">
        <div className="flex w-full md:max-w-sm mx-auto overflow-hidden bg-white-light rounded-lg shadow-lg max-w-3xl ">
          <div
            className="md:hidden bg-cover block w-1/2 bg-center"
            style={{
              backgroundImage: `url(${SeattleLanding})`,
            }}
          ></div>

          <form
            onSubmit={handleSubmit(() => {
              submitHandler();
            })}
            id="signInForm"
            className="w-full px-6 py-8 md:px-8 "
          >
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
              <label className="block mb-2 text-sm font-medium text-gray-600 ">
                Email Address
              </label>
              <input
                {...register("email")}
                className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-white-light border rounded-lg  dark:border-gray-300 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500  hover:underline">
                  Forget Password?
                </a>
              </div>

              <input
                {...register("password")}
                className="block w-full px-4 py-2 text-gray-700 bg-white dark:bg-white-light border rounded-lg   dark:border-gray-300 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-6 w-full px-6 py-3 text-sm font-medium tracking-wide text-white-light capitalize transition-colors duration-300 transform bg-gold-light rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  md:w-1/4"></span>

              <a
                href="/register"
                className="text-xs text-gray-500 uppercase  hover:underline"
              >
                or sign up
              </a>

              <span className="w-1/5 border-b  md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
