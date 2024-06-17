import { useEffect, useState } from "react";
import { format } from "timeago.js";

import { walletTransactions } from "../../service/User/UserService";

const WalletTransactionPagination = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(2);
  const [sortOrder, setSortOrder] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchwalletTransaction = async () => {
      try {
        const response = await walletTransactions(searchTerm, statusFilter, currentPage, transactionsPerPage, sortOrder)
        setTransactionList(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching wallet transactions:", error);
      }
    };
    fetchwalletTransaction();
  }, [searchTerm, statusFilter, currentPage, transactionsPerPage, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
    <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
  
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
      <input
        type="text"
        className="w-full sm:w-64 border rounded-lg px-4 py-2 mb-2 sm:mb-0"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        className="w-full sm:w-auto border rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleSortOrder}
      >
        Sort by Amount {sortOrder === "asc" ? "asc" : "dec"}
      </button>
    </div>
  
    {transactionList.length > 0 ? (
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Booking Id</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Transaction Id</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Payment Mode</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Refund Status</th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionList.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700">{transaction.bookingId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700">{transaction.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{transaction.bookingDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">₹ {transaction.totalAmounttoPay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{transaction.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === "Booked" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.paymentMethod !== "by Cash" && transaction.status === "cancel" ? "bg-green-100 text-green-800" : ""}`}>
                      {transaction.paymentMethod !== "by Cash" && transaction.status === "cancel" ? "Amount credited to wallet" : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{format(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <p className="text-gray-500 text-center mt-4">No transactions found.</p>
    )}
  
    <div className="p-4 flex justify-between items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}`}
      >
        Previous
      </button>
      <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 ${currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}`}
      >
        Next
      </button>
    </div>
  </div>
  
  );
};

export default WalletTransactionPagination;
