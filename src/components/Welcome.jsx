import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { useContext, useState } from "react";
import { Loader } from "./Loader";
import { TransactionContext } from "../context/TransactionContext";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, type, name, value, changeHandler }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className=" my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      placeholder={placeholder}
      onChange={(e) => {
        changeHandler(e, name);
      }}
    />
  );
};

export function Welcome() {
  const {
    connectWallet,
    account,
    formData,
    handleChange,
    isLoading,
    sendTransaction,
  } = useContext(TransactionContext);

  function handleSubmit() {
    const { addressTo, amount, message, keyword } = formData;
    if (!addressTo || !amount || !message || !keyword) {
      alert("please input all info");
      return;
    }
    sendTransaction();
  }

  function formatAddress(address) {
    const len = address.length;
    return `${address.slice(0, 5)}....${address.slice(len - 4, len)}`;
  }

  return (
    <>
      <div className=" flex w-full justify-center items-center">
        <div className="flex md:flex-row flex-col items-start sm:items-center justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col md:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Send Crypto <br /> across the world
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Explore the crypto world. Buy and sell cryptocurrencies easily on
              Krypto.
            </p>
            {!account && (
              <button
                type="button"
                className=" flex flex-row w-full justify-center items-center rounded-full bg-[#2952e3] my-5 hover:bg-[#2546bd] cursor-pointer p-3"
                onClick={connectWallet}
              >
                <p className="text-white text-base font-semibold">
                  Connect Wallet
                </p>
              </button>
            )}
            <div className=" grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
              <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                Reliability
              </div>
              <div className={companyCommonStyles}>Security</div>
              <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                Ethereum
              </div>
              <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                Web 3.0
              </div>
              <div className={companyCommonStyles}>Low Fees</div>
              <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                Blockchain
              </div>
            </div>
          </div>
          <div className=" sm:w-96 w-full flex flex-col justify-start items-center shadow-2xl mt-10 sm:mt-5  ">
            <div className="eth-card .white-glassmorphism w-full rounded-lg p-5  blue-glassmorphism">
              <div className=" w-full  flex flex-row justify-between items-start ">
                <div className=" text-xl text-white rounded-full border-white border-2 p-1">
                  <SiEthereum />
                </div>
                <div className=" text-xl text-white rounded-full border-white">
                  <BsInfoCircle />
                </div>
              </div>
              <div className=" text-white flex flex-col font-bold justify-start w-full mt-10">
                {/* display account */}
                <p className=" font-normal">
                  {account ? formatAddress(account) : "....."}
                </p>
                <p className=" mt-2">Ethereum</p>
              </div>
            </div>
            {/* form */}
            <div className=" mt-5 blue-glassmorphism w-full rounded-lg  flex flex-col flex-1 justify-center items-center p-5">
              <Input
                type="text"
                placeholder="Address To"
                name="addressTo"
                value={formData.addressTo}
                changeHandler={handleChange}
              />
              <Input
                type="number"
                placeholder="Amount (ETH)"
                name="amount"
                value={formData.amount}
                changeHandler={handleChange}
              />
              <Input
                type="text"
                placeholder="Keyword (Gif)"
                name="keyword"
                value={formData.keyword}
                changeHandler={handleChange}
              />
              <Input
                type="text"
                placeholder="Enter Message"
                name="message"
                valye={formData.message}
                changeHandler={handleChange}
              />
              <div className="h-[1px] w-full bg-gray-400 my-2" />
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className=" mt-3 w-full py-2 text-center text-white border-[1px] border-[#3d4f7c] cursor-pointer rounded-full"
                >
                  Send now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
