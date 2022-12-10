// use conntext

import dayjs from "dayjs";
import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { transactionAbi, transactionAddress } from "../constants";

const { ethereum } = window;

// create transaction context

export const TransactionContext = createContext();

const createEtherumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();
  const transactionContract = new ethers.Contract(
    transactionAddress[chainId],
    transactionAbi,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [account, setAccount] = useState();

  const [isLoading, setIsLoading] = useState();

  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const [transactionCount, setTransactionCount] = useState(0);

  const [allTransactions, setAllTransactions] = useState([]);

  async function queryTransactionCount() {
    if (!ethereum) {
      return;
    }
    try {
      const transactionContract = await createEtherumContract();
      const tc = await transactionContract.getTransactionCount();
      setTransactionCount(tc.toNumber());
      console.log(tc.toNumber());
    } catch (error) {
      console.log(error);
    }
  }

  async function queryAllTransactions() {
    try {
      if (!ethereum) {
        return;
      }
      const transactionContract = await createEtherumContract();
      const transactions = await transactionContract.getAllTransactions();
      setAllTransactions(
        transactions.map((data) => {
          return {
            addressTo: ethers.utils.getAddress(data.receiver),
            addressFrom: ethers.utils.getAddress(data.sender),
            amount: ethers.utils.formatEther(data.amount),
            keyword: data.keyword,
            message: data.message,
            timestamp: dayjs.unix(data.timestamp).format("YYYY-MM-DDTHH:mm:ss"),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e, name) {
    setFormData((form) => {
      return { ...form, [name]: e.target.value };
    });
  }

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      alert("Please install metamask");
      return;
    }
    // Returns a list of addresses owned by client.
    // 钱包连接后，返回连接到网站的账户
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        console.log("not account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (!ethereum) {
      alert("Please install metamask");
      return;
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      const { addressTo, amount, keyword, message } = formData;
      const parseAmount = ethers.utils.parseEther(amount);
      setIsLoading(true);
      const txnHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: ethers.utils.getAddress(addressTo),
            value: parseAmount._hex,
            gas: "0x76c0",
          },
        ],
      });
      const transactionsContract = await createEtherumContract();
      const txn = await transactionsContract.addToBlockChain(
        addressTo,
        parseAmount,
        keyword,
        message
      );
      await txn.wait();
      await queryTransactionCount();
      await queryAllTransactions();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    queryTransactionCount();
    queryAllTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        account,
        formData,
        handleChange,
        isLoading,
        sendTransaction,
        allTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
