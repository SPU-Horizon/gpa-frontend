export default function NotFound404() {
  return (
    <div className="h-screen">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-5xl font-semibold text-gold-base">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center  justify-evenly gap-x-6">
            <a
              href="/dashboard"
              className=" transition-all rounded-md bg-gold-base px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go to Dashboard
            </a>

            <a
              href="/sign-in"
              className="text-sm font-semibold text-white-light bg-black-base px-3.5 py-2.5 rounded-md shadow-sm hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
            >
              Sign In <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
