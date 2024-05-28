import { axiosInstance } from "../../api/axios";
let token = localStorage.getItem("accessToken");

const newToken = JSON.parse(token);
token = newToken?.accessToken;

export const getUserData = async () => {
  try {
    
    
    const response = await axiosInstance.get(`/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in getting userData", err);
    return err;
  }
};

export const userActions = async (userId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/users/action`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //   console.log("...........................................")
    //   console.log("response", response);
    //   console.log(" response.data", response.data);
    //   console.log("response.data.msg", response.data.msg);
    //   console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in user Action", err);
    return err;
  }
};

export const getProviderData = async () => {
  try {
    const response = await axiosInstance.get(`/admin/providers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in Get provider Data", err);
    return err;
  }
};

export const providerActions = async (providerId) => {
  try {
    const response = await axiosInstance.get(
      `/admin/providers/action/${providerId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //   console.log("...........................................")
    //   console.log("response", response);
    //   console.log(" response.data", response.data);
    //   console.log("response.data.msg", response.data.msg);
    //   console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in Provider action", err);
    return err;
  }
};

export const getBookingData = async () => {
  try {
    const response = await axiosInstance.get(`/admin/getallbookingdata`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in Get booking data", err);
    return err;
  }
};


export const singleBookingDetails = async (id) => {
  try {
    console.log(id)
    const response = await axiosInstance.get(`/admin/singlebookingdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in Get booking data", err);
    return err;
  }
};

export const fetchOverallSalesData = async () => {
  try {
    console.log("Welcome to admin dashboard")

     const response = await axiosInstance.get(`/admin/getdashboarddata`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
     console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in admin dashboard==>", err);
    return err;
  }
};


export const fetchSalesDataGraph = async (period) => {
  try {
    console.log(period)
    const response = await axiosInstance.post(`/admin/getgraphdata`,{period}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in Get booking data", err);
    return err;
  }
};

export const getAllOffers = async () => {
  try {
   
    const response = await axiosInstance.get(`/admin/getalloffers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in Get oofers", err);
    return err;
  }
};

export const saveOfferData = async (offer) => {
  try {
   
    const response = await axiosInstance.post(`/admin/saveofferdata`,offer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in save oofers", err);
    return err;
  }
};

export const getProvider = async () => {
  try {
   
    const response = await axiosInstance.get(`/admin/getallprovider`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in get provider", err);
    return err;
  }
};


export const deleteOffer = async (id) => {
  try {
    console.log(id)
   
    const response = await axiosInstance.delete(`/admin/deleteoffer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("...........................................")
    // console.log("response", response);
    // console.log(" response.data", response.data);
    // console.log("response.data.msg", response.data.msg);
    // console.log("........................................")
    return response;
  } catch (err) {
    console.log("Error in delete offer", err);
    return err;
  }
};