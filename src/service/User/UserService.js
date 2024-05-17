import { userInstance } from "../../api/userInstance";
let tokens = localStorage.getItem("userAccessToken");

const newToken = JSON.parse(tokens);
const token = newToken?.userAccessToken;

export const userLogin = async (email, password) => {
  try {
    console.log("Welcome to user login");
    console.log(email, password);
    const response = await userInstance.post(`/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    console.log("Error in user login", error);
    return error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    console.log("Welcome to user cancel booking");

    const response = await userInstance.post(
      `/cancelBooking/${bookingId}`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user booking cancel", error);
    return error;
  }
};

export const getSearchedRoomData = async (data) => {
  try {
    console.log("Welcome to user Room search");

    const response = await userInstance.post(`/fetchdata`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user get searched room data", error);
    return error;
  }
};

export const userAddsRoom = async (data) => {
  try {
    console.log("Welcome to user Add room");

    const response = await userInstance.post(`/addroom`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user Add room", error);
    return error;
  }
};

export const changeUserPassword = async (data) => {
  try {
    console.log("Welcome to user change password==>", data);

    const response = await userInstance.put(`/changepassword`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user change password", error);
    return error;
  }
};

export const editUserProfile = async () => {
  try {
    console.log("Welcome to user edit profile");

    const response = await userInstance.post(
      `/getuserdata`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user edit profile", error);
    return error;
  }
};

export const userUpdateData = async (formDataToSend) => {
  try {
    console.log("Welcome to user update data");

    const response = await userInstance.put(`/updateuserdata`, formDataToSend, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user update data", error);
    return error;
  }
};

export const editUserRoom = async (roomId) => {
  try {
    console.log("Welcome to user edit room");

    const response = await userInstance.get(`/editrooms/${roomId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user edit room", error);
    return error;
  }
};

export const userUpdateRoom = async (id, data) => {
  try {
    console.log("Welcome to user save update  Room", id, data);

    const response = await userInstance.post(`/updaterooms/${id}`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user save update room", error);
    return error;
  }
};

export const userBookingPreview = async () => {
  try {
    console.log("Welcome to user bookings");

    const response = await userInstance.post(
      `/getuserbookings`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user bookings", error);
    return error;
  }
};

export const getUserData = async () => {
  try {
    console.log("Welcome to get User Data",token);

    const response = await userInstance.post(
      `/getuserdata`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user get Data", error);
    return error;
  }
};

export const rentifyUser = async () => {
  try {
    console.log("Welcome to get User rent room");

    const response = await userInstance.post(
      `/userrequested`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user rent room", error);
    return error;
  }
};

export const getUsersRoom = async () => {
  try {
    console.log("Welcome to get User saved room data");

    const response = await userInstance.get(`/room`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user saved room data", error);
    return error;
  }
};

export const bookRoom = async (newData, roomId) => {
  try {
    console.log("Welcome to get User book Room");
    console.log("First in book room function")

    const response = await userInstance.post(`/bookroom/${roomId}`, newData, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user booking", error);
    return error;
  }
};

export const roomViewPage = async (id) => {
  try {
    console.log("Welcome to get User  Room preview");

    const response = await userInstance.get(`/roompreview/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user room preview", error);
    return error;
  }
};

export const bookRoomPage = async (roomId, data) => {
  try {
    console.log("Welcome to get User  book room");

    const response = await userInstance.post(`/bookrooms/${roomId}`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user room booking", error);
    return error;
  }
};

export const verifyBookings = async (roomId) => {
  try {
    console.log("Welcome to get User  verify booking");
    console.log("Second verify razorpay")

    const response = await userInstance.post(
      `/verifybooking/${roomId}`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user verify booking", error);
    return error;
  }
};

export const placeBookingOrder = async (bookingDetails, mode) => {
  try {
    console.log("Welcome to get User place booking order");
    console.log("Third place booking order")
    const data = {
      bookingDetails,
      mode,
    };

    const response = await userInstance.post(`/placeorder`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user place booking order", error);
    return error;
  }
};


export const individualBooking = async (roomId) => {
  try {
    console.log("Welcome to get User  Room preview");

    const response = await userInstance.post(`verifybooking/${roomId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user room boking individual", error);
    return error;
  }
};

export const userWalletBalence = async () => {
  try {
    console.log("Welcome to get User wallet");

    const response = await userInstance.get(`/getuserwallet`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user room boking individual", error);
    return error;
  }
};


export const submitReview = async (data,roomId) => {
  try {
    console.log("Welcome to get User review");

    const response = await userInstance.post(`/userreview/${roomId.id}`,{data}, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user review", error);
    return error;
  }
};


export const getAllReviews = async (roomId) => {
  try {
    console.log("Welcome to get User review");

    const response = await userInstance.get(`/getallreview/${roomId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user review", error);
    return error;
  }
};


export const saveToCart = async (bookingDetails) => {
  try {
    console.log("Welcome to get User review");

    const response = await userInstance.post(`/savetocart`,bookingDetails, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user cart", error);
    return error;
  }
};


export const getCartData = async () => {
  try {
    console.log("Welcome to get User review");

    const response = await userInstance.get(`/getcartdata`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user cart data", error);
    return error;
  }
};

export const getUsersDashboard = async () => {
  try {
    console.log("Welcome to get User Dashboard");

    const response = await userInstance.get(`/getuserdashboard`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user dashboard", error);
    return error;
  }
};

export const isBooked = async (roomId,formData) => {
  try {
    console.log("Welcome to get is booked rooms");

    const response = await userInstance.post(`/isroombooked/${roomId}`,formData, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user is room booked", error);
    return error;
  }
};