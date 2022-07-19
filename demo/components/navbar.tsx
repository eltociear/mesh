import { useState } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon, MenuIcon } from "@heroicons/react/solid";

const Navbar = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  function toggle() {
    let newMode = !darkMode;
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDarkMode(newMode);
  }

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
            Mesh Playground
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => {
              toggle();
            }}
          >
            {darkMode ? (
              <MoonIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <SunIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {/* <a
            href="#"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </a>
          <a
            href="#"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Get started
          </a> */}
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="w-6 h-6" />
            {/* <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg> */}
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <NavLink href={"/wallet"} label={"Wallet"} />
            <NavLink href={"/transaction"} label={"Transaction"} />
            <NavLink href={"/ipfs"} label={"IPFS"} />
          </ul>
        </div>
      </div>
    </nav>

    // <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
    //   <div className="container flex flex-wrap justify-between items-center mx-auto">
    //     <a href="https://mesh.martify.io/" className="flex items-center">
    //       <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
    //         Mesh Playground
    //       </span>
    //     </a>
    //     <button
    //       data-collapse-toggle="navbar-default"
    //       type="button"
    //       className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //       aria-controls="navbar-default"
    //       aria-expanded="false"
    //     >
    //       <span className="sr-only">Open main menu</span>
    //       <svg
    //         className="w-6 h-6"
    //         aria-hidden="true"
    //         fill="currentColor"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           fill-rule="evenodd"
    //           d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    //           clip-rule="evenodd"
    //         ></path>
    //       </svg>
    //     </button>
    //     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
    //       <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
    //         <NavLink href={"/wallet"} label={"Wallet"} />
    //         <NavLink href={"/transaction"} label={"Transaction"} />
    //         <NavLink href={"/ipfs"} label={"IPFS"} />
    //         <li>
    //           <button
    //             type="button"
    //             className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
    //             onClick={() => {
    //               toggle();
    //             }}
    //           >
    //             {darkMode ? (
    //               <MoonIcon className="h-4 w-4 text-gray-500" />
    //             ) : (
    //               <SunIcon className="h-4 w-4 text-gray-500" />
    //             )}
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    // <nav className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
    //   <div className="flex items-center">
    //     <Link href="/">
    //       <h3 className="text-2xl font-medium text-slate-600 cursor-pointer">
    //         Mesh Playground
    //       </h3>
    //     </Link>
    //   </div>

    //   <div className="flex items-center space-x-5">
    //     <Link
    //       className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
    //       href="/wallet"
    //     >
    //       Wallet
    //     </Link>
    //     <Link
    //       className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
    //       href="/transaction"
    //     >
    //       Transaction
    //     </Link>
    //     <Link
    //       className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
    //       href="/ipfs"
    //     >
    //       IPFS
    //     </Link>
    //   </div>
    // </nav>
  );
};

function NavLink({ href, label }) {
  return (
    <li className="">
      <Link href={href}>
        {/* <span className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"> */}
        <span className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer">
          {label}
        </span>
      </Link>
    </li>
  );
}
export default Navbar;