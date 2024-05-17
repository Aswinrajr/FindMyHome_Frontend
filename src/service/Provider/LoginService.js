import { providerInstance } from "../../api/providerAxiosInstance";
let token = localStorage.getItem("providerAccessToken");
const newToken = JSON.parse(token);
token = newToken?.providerAccessToken;
console.log("Welcome to get provider rooms---------", token);

export const providerLogin = async (email, password) => {
  try {
    console.log("Welcome to admin login");
    console.log(email, password);
    const response = await providerInstance.post(`/login`, {
      email,
      password,
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const getRoomData = async () => {
  try {
    const response = await providerInstance.get(`/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response.data", response.data);
    return response.data;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const getProviderData = async (data) => {
  try {
    const saveResponse = await providerInstance.post(`/savedata`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return saveResponse;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const getProviderCard = async () => {
  try {
    const response = await providerInstance.get(`/getprovider`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const changePassword = async (data) => {
  try {
    const response = await providerInstance.post(`/changepassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const getEditRooms = async (roomId) => {
  try {
    const response = await providerInstance.get(`/rooms/editrooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const completeDatas = async () => {
  try {
    const response = await providerInstance.post(
      `/completedata`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const addRooms = async (data) => {
  try {
    const response = await providerInstance.post(`/rooms/addrooms`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const getAllbookingData = async () => {
  try {
    const response = await providerInstance.get(
      `/getbookingdata`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const verifyProvider = async () => {
  try {
    const response = await providerInstance.get(
      `/getprovider`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const singleBookingProvider = async (id) => {
  try {
    const response = await providerInstance.get(
      `/singlebooking/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};

export const providerDashboard = async () => {
  try {
    const response = await providerInstance.get(
      `/providerdashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response;
  } catch (err) {
    console.log("Error in provider login", err);
    return err;
  }
};
