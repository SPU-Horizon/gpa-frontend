// Footer.tsx

function Footer() {
  return (
    <div className="col-span-3 row-start-6 ">
      <footer className="flex justify-between p-4 md:items-center md:justify-between md:p-6 ">
        <div>
          <p className="font-avenir font-bold">
            &copy; GPA 2024 <a href="../privacy" className="text-red-600">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
