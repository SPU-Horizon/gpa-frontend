const links = [
  { link: "#", label: "Vision" },
  { link: "#", label: "Features" },
  { link: "#", label: "SPU" },
  { link: "/sign-in", label: "Sign In" },
  { link: "/register", label: "Create Account" },
];

export default function FooterSection() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 flex md:flex-col">
      <div className="sm:text-center sm:p-7 flex flex-col justify-center  w-full p-14  dark:bg-gray-200 lg:px-12 xl:px-32 lg:w-1/2 md:w-full">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
          Get In Touch
        </h1>

        <p className="font-medium mt-4 text-gray-500 dark:text-gray-400">
          Any suggestions? We'd love to hear from you.
        </p>
      </div>

      <div className="flex flex-col justify-center w-full p-8 pt-0 lg:w-1/2 lg:px-12 xl:px-24 md:w-full md:pt-4 bg-gold-light ">
        <form>
          <div className="-mx-2 md:items-center md:flex-col md:gap-4">
            <div className="flex-1 px-2">
              <label className="mb-2 text-sm text-gray-600 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className=" w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-600 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="flex-1 px-2 mt-4 md:mt-0">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email address
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Message
            </label>
            <textarea
              className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Message"
            ></textarea>
          </div>

          <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white-light capitalize transition-colors duration-300 transform bg-black-light rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Submit
          </button>
        </form>
        <div className=" md:mt-8 mt-16 mb-4 ">
          <h3 className="font-medium text-gray-600 dark:text-gray-300 text-center hover:text-gray-50">
            Need Directions?
          </h3>
        </div>
        <div className="flex flex-wrap gap-4 self-center justify-evenly ">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className=" hover:text-gray-50 dark:text-gray-300 font-medium line-clamp-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
