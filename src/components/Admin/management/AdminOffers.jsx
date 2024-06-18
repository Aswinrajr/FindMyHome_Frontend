import { useEffect, useState } from "react";
import {
  deleteOffer,
  getAllOffers,
  getProvider,
  saveOfferData,
} from "../../../service/Admin/ManagementService";

const AdminOffers = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [offerValidFrom, setOfferValidFrom] = useState("");
  const [offerValidTo, setOfferValidTo] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [activeOffers, setActiveOffers] = useState([]);
  const [providerData, setProviderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProvider();
        const response = await getAllOffers();
        console.log("Offer response", response.data.data);
        console.log("resultr", result);
        if (result?.data) {
          setProviderData(result.data);
        }
        if (response?.data) {
          setActiveOffers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleProviderSelect = (e) => {
    const selectedProviderId = e.target.value;
    const selectedProvider = providerData.find(
      (p) => p._id === selectedProviderId
    );
    console.log(selectedProvider);
    setSelectedProvider(selectedProvider);
  };

  const handleValidFromChange = (e) => {
    setOfferValidFrom(e.target.value);
  };

  const handleValidToChange = (e) => {
    setOfferValidTo(e.target.value);
  };

  const handleOfferCodeChange = (e) => {
    setOfferCode(e.target.value);
  };

  const disablePastDates = (date) => {
    const today = new Date();
    return date < today;
  };

  const handleActivateOffer = async () => {
    if (selectedProvider && offerValidFrom && offerValidTo && offerCode) {
      const newOffer = {
        providerId: selectedProvider._id,
        providerName: selectedProvider.providerName,
        validFrom: offerValidFrom,
        validTo: offerValidTo,
        offerCode: offerCode,
      };
      console.log("New offer", newOffer);

      setActiveOffers([...activeOffers, newOffer]);
      setSelectedProvider(null);
      setOfferValidFrom("");
      setOfferValidTo("");
      setOfferCode("");

      try {
        const response = await saveOfferData(newOffer);
        console.log("Response", response);
      } catch (err) {
        console.log("Errro on saing offer", err);
      }
    }
  };

  const handleDeactivateOffer = async (index, id) => {
    const updatedOffers = [...activeOffers];
    updatedOffers.splice(index, 1);
    setActiveOffers(updatedOffers);
    const response = await deleteOffer(id);
    console.log("Response", response);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Admin Offers
      </h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Offer Valid From
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Offer Valid To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Offer Code
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {selectedProvider ? selectedProvider._id : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    onChange={handleProviderSelect}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Provider</option>
                    {providerData.map((provider) => (
                      <option key={provider._id} value={provider._id}>
                        {provider.providerName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="date"
                    value={offerValidFrom}
                    onChange={handleValidFromChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="date"
                    value={offerValidTo}
                    onChange={handleValidToChange}
                    min={offerValidFrom}
                    disabled={disablePastDates}
                    className="mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    placeholder="Enter Offer Code"
                    value={offerCode}
                    onChange={handleOfferCodeChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                    onClick={handleActivateOffer}
                  >
                    Activate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {activeOffers.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h3 className="text-xl font-semibold text-gray-900 px-6 py-4 bg-gray-50">
            Active Offers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Provider
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Valid From
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Valid To
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Offer Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeOffers.map((offer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {offer.providerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${offer.validFrom}`.toString().split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${offer.validTo}`.toString().split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {offer.offerCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => handleDeactivateOffer(index, offer._id)}
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;
