import logo from "../assets/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import { useState } from "react";

const NavbarItem = ({ title, classProps }) => {
  return <li className={` mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

// 当使用了flex布局之后 考虑大部分的布局使用 flex + position 定位来实现
export function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className=" w-full flex md:justify-center justify-between p-4 items-center">
      {/* fiex-initial : 0 1 auto */}
      <div className=" md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className=" w-32 cursor-pointer"></img>
      </div>
      {/* hidden 和 flex 冲突 ，下面的是在中等屏幕即以上都是flex布局，但是在mobile则是 hidden */}
      {/* 如果不加 hidden ，在mobile上则是默认的ul布局 */}
      <ul className=" text-white md:flex list-none flex-row justify-between items-center hidden">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
          return <NavbarItem key={item + index} title={item} classProps={""} />;
        })}
        <li className=" mx-4 rounded-full cursor-pointer bg-[#2952e3] py-2 px-4 md:font-bold hover:bg-[#2456bd]">
          Login
        </li>
      </ul>
      <div className=" flex relative ">
        {toggleMenu ? (
          <AiOutlineClose
            className=" cursor-pointer text-white text-4xl md:hidden"
            onClick={() => {
              setToggleMenu(false);
            }}
          />
        ) : (
          <HiMenuAlt4
            className=" cursor-pointer text-white text-4xl md:hidden"
            onClick={() => {
              setToggleMenu(true);
            }}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className=" text-xl w-full my-2">
              <AiOutlineClose
                onClick={() => {
                  setToggleMenu(false);
                }}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => {
                return (
                  <NavbarItem
                    key={item + index}
                    title={item}
                    classProps="my-2 text-lg"
                  />
                );
              }
            )}
            <li className=" mx-4 p-2 rounded-full cursor-pointer py-2 px-4 hover:bg-[#2456bd] bg-[#2952e3]">
              Login
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
