import { useEffect, useState } from "react";
import {
  FaWallet,
  FaMoneyBillAlt,
  FaMoneyCheckAlt,
  FaCoins,
} from "react-icons/fa";
import TopBar from "../../components/Sample/TopBar";
import Footer from "../../components/Sample/Footer";
import {
  userWalletBalence,

} from "../../service/User/UserService";
import WalletTransactionPagination from "./WalletTransactionPagination";

const UserWallet = () => {
  const [walletBalance, setWalletBalance] = useState();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const response = await userWalletBalence();
      console.log(response);
      if (response.status === 200) {
        setWalletBalance(response.data.walletBalance);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchwalletTransaction = async () => {
  //     const transactions = await walletTransactions();
  //     console.log("Transcations", transactions);
  //     setTransactionList(transactions.data.transactions);
  //   };
  //   fetchwalletTransaction();
  // }, []);

  const handleDeposit = () => {
    if (depositAmount > 0) {
      setWalletBalance(walletBalance + parseFloat(depositAmount));
      setDepositAmount("");
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= walletBalance) {
      setWalletBalance(walletBalance - parseFloat(withdrawAmount));
      setWithdrawAmount("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-7">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaWallet className="text-4xl text-indigo-600 mr-2" />
              <h2 className="text-2xl font-semibold">Your Wallet</h2>
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              ${walletBalance?.toFixed(2)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-600 rounded-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <FaMoneyBillAlt className="text-3xl mr-2" />
                <h3 className="text-lg font-semibold">Deposit</h3>
              </div>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                max={9999}
                min={300}
                maxLength={4}
              />
              <button
                onClick={handleDeposit}
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition-colors duration-300"
              >
                Deposit
              </button>
            </div>
            <div className="bg-indigo-600 rounded-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <FaMoneyCheckAlt className="text-3xl mr-2" />
                <h3 className="text-lg font-semibold">Withdraw</h3>
              </div>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 rounded-md bg-gray-200 text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                max={9999}
                min={300}
                maxLength={4}
              />
              <button
                onClick={handleWithdraw}
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 hover:text-white transition-colors duration-300"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="mt-8 flex items-center justify-center ">
        <FaCoins className="text-4xl text-indigo-600 mr-2 mb-20" />
        <p className="text-lg font-semibold mb-20">
          Secure and instant transactions with our wallet.
        </p>
      </div>

      <WalletTransactionPagination />

      <Footer className="mt-auto" />
    </div>
  );
};

export default UserWallet;
