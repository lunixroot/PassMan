import React from "react";

const Navbar = () => {
  return (
    <nav className=" text-black w-full text-lg p-4 ">
      <div className="flex justify-between items-center mx-auto max-w-6xl">
        <div className="text-2xl ">
          <span className="text-purple-500 text">&lt;</span>
          Pass
          <span className="text-purple-500">Man&gt;</span>
        </div>
        <ul className="flex space-x-4">
          <li className="flex gap-4 m-auto text-lg font-light">
            <a
              className="hover:text-purple-400 transition-colors duration-200"
              href="/"
            >
              Home
            </a>
            <a
              className="hover:text-purple-400 transition-colors duration-200"
              href="/"
            >
              contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
