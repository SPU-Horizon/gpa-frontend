import { useState } from "react";

const links = [
  { link: "#", label: "Vision" },
  { link: "#", label: "Features" },
  { link: "#", label: "SPU" },
  { link: "/sign-in", label: "Sign In" },
  { link: "/register", label: "Create Account" },
];

export default function FooterSection() {
  const email = "graduationplanningapp@gmail.com";
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section
      id="ContactUs"
      className="min-h-screen bg-white dark:bg-black flex md:flex-col md:justify-between border-t-[3px] border-gold-ligh dark:border-black-base "
    >
      <div className="sm:text-center sm:p-7 flex flex-col justify-center  w-full p-14  dark:bg-black-light lg:px-12 xl:px-32 lg:w-1/2 md:w-full">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
          Get In Touch
        </h1>

        <p className="font-medium mt-4 text-gray-500 dark:text-white">
          Any suggestions? We'd love to hear from you.
        </p>
      </div>

      <div className="flex flex-col justify-center w-full p-8 pt-0 lg:w-1/2 lg:px-12 xl:px-24 md:w-full md:pt-4 bg-[#927d4ebd] ">
        <form>
          <div className="-mx-2 md:items-center md:flex-col md:gap-4">
            <div className="flex-1 px-2">
              <label className="mb-2 text-sm text-gray-600 dark:text-gray-200">
                Subject
              </label>
              <input
                id="mail-subject"
                type="text"
                placeholder="Subject"
                className=" w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-600 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Message
            </label>
            <textarea
              id="mail-message"
              className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-50 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="w-full mt-8">
            <a
              className="block w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md hover:bg-black-base focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center"
              href={`mailto:${email}?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(message)}`}
              onClick={(e) => {
                const mailSubject = document.getElementById(
                  "mail-subject"
                ) as HTMLInputElement;
                const mailMessage = document.getElementById(
                  "mail-message"
                ) as HTMLInputElement;

                if (mailSubject) mailSubject.value = "";
                if (mailMessage) mailMessage.value = "";
              }}
            >
              Send Message
            </a>
          </div>
        </form>
        <div className=" md:mt-8 mt-16 mb-4 ">
          <h3 className="font-medium text-gray-600 dark:text-gray-100 text-center hover:text-gray-50 dark:hover:text-white-light">
            Need Directions?
          </h3>
        </div>
        <div className="flex flex-wrap gap-4 self-center justify-evenly ">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.link}
              className=" hover:text-gray-50 dark:text-gray-100 font-medium line-clamp-1 dark:hover:text-white-light"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
