import { axiosInstance } from "../../api/axios";
let token = localStorage.getItem("accessToken");

const newToken = JSON.parse(token);
token = newToken?.accessToken;

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("Error in getting userData", err);
    return err;
  }
};

export const userActions = async (userId) => {
  try {
    const response = await axiosInstance.post(
      `/users/action`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.log("Error in user Action", err);
    return err;
  }
};

export const getProviderData = async () => {
  try {
    const response = await axiosInstance.get(`/providers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("Error in Get provider Data", err);
    return err;
  }
};

export const providerActions = async (providerId) => {
  try {
    const response = await axiosInstance.get(
      `/providers/action/${providerId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.log("Error in Provider action", err);
    return err;
  }
};

export const getBookingData = async () => {
  try {
    const response = await axiosInstance.get(`/getallbookingdata`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("Error in Get booking data", err);
    return err;
  }
};

export const singleBookingDetails = async (id) => {
  try {
    console.log(id);
    const response = await axiosInstance.get(`/singlebookingdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("Error in Get booking data", err);
    return err;
  }
};

export const fetchOverallSalesData = async () => {
  try {
    console.log("Welcome to admin dashboard");

    const response = await axiosInstance.get(`/getdashboarddata`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (err) {
    console.log("Error in admin dashboard==>", err);
    return err;
  }
};

export const fetchSalesDataGraph = async (period) => {
  try {
    console.log(period);
    const response = await axiosInstance.post(
      `/getgraphdata`,
      { period },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   
    return response;
  } catch (err) {
    console.log("Error in Get booking data", err);
    return err;
  }
};

export const getAllOffers = async () => {
  try {
    const response = await axiosInstance.get(`/getalloffers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response;
  } catch (err) {
    console.log("Error in Get oofers", err);
    return err;
  }
};

export const saveOfferData = async (offer) => {
  try {
    const response = await axiosInstance.post(`/saveofferdata`, offer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response;
  } catch (err) {
    console.log("Error in save oofers", err);
    return err;
  }
};

export const getProvider = async () => {
  try {
    const response = await axiosInstance.get(`/getallprovider`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response;
  } catch (err) {
    console.log("Error in get provider", err);
    return err;
  }
};

export const deleteOffer = async (id) => {
  try {
    console.log(id);

    const response = await axiosInstance.delete(`/deleteoffer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response;
  } catch (err) {
    console.log("Error in delete offer", err);
    return err;
  }
};

export const getAdminSaleAnalysis = async (period) => {
  try {
    const response = await axiosInstance.get(`/getgraphdata/${period}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response;
  } catch (err) {
    console.log("Error in delete offer", err);
    return err;
  }
};
