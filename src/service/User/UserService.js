import { userInstance } from "../../api/userInstance";
let tokens = localStorage.getItem("userAccessToken");

const newToken = JSON.parse(tokens);
const token = newToken?.userAccessToken;

export const userLogin = async (email, password) => {
  try {
    console.log("Welcome to user login");

    const response = await userInstance.post(`/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    console.log("Welcome to user cancel booking");

    const response = await userInstance.put(
      `/cancelBooking/${bookingId}`,

      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    return error;
  }
};

export const changeUserPassword = async (data) => {
  try {
    console.log("Welcome to user change password");

    const response = await userInstance.put(`/changepassword`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    return error;
  }
};

export const userUpdateRoom = async (id, data) => {
  try {
    console.log("Welcome to user save update  Room");

    const response = await userInstance.put(`/updaterooms/${id}`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const userBookingPreview = async (currentPage, limit, sortOrder) => {
  try {
    console.log("Welcome to user bookings");

    const response = await userInstance.post(
      `/getuserbookings`,
      { currentPage, limit, sortOrder },
      {},
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const getUserData = async () => {
  try {
    console.log("Welcome to get User Data");

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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    console.log("Error in user saved room data", error);
    return error;
  }
};

export const bookRoom = async (newData, roomId) => {
  try {
    const response = await userInstance.post(`/bookroom/${roomId}`, newData, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    return error;
  }
};

export const bookRoomPage = async (roomId, data) => {
  try {
    console.log("Welcome to get User  book room", roomId, data);

    const response = await userInstance.post(`/bookrooms/${roomId}`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const verifyBookings = async (roomId) => {
  try {
    console.log("Welcome to get User  verify booking");

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

    return response;
  } catch (error) {
    return error;
  }
};

export const placeBookingOrder = async (bookingDetails, mode) => {
  try {
    console.log("Welcome to get User place booking order");

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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    return error;
  }
};

export const submitReview = async (data, roomId) => {
  try {
    console.log("Welcome to get User submit  review");

    const response = await userInstance.post(
      `/userreview/${roomId}`,
      { data },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const getAllReviews = async (roomId) => {
  try {
    console.log("Welcome to get User getAllReviews");

    const response = await userInstance.get(`/getallreview/${roomId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const saveToCart = async (bookingDetails) => {
  try {
    console.log("Welcome to get User review");

    const response = await userInstance.post(`/savetocart`, bookingDetails, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
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

    return response;
  } catch (error) {
    return error;
  }
};

export const isBooked = async (roomId, formData) => {
  try {
    console.log("Welcome to get is booked rooms");

    const response = await userInstance.post(
      `/isroombooked/${roomId}`,
      formData,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const continueWithWallet = async (bookingDetails, mode) => {
  try {
    console.log("Welcome to payment through wallet");
    const data = {
      bookingDetails,
      mode,
    };

    const response = await userInstance.post(`/walletpayment`, data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error in wallet payment", error);
  }
};

export const walletTransactions = async (
  searchTerm,
  statusFilter,
  currentPage,
  transactionsPerPage,
  sortOrder
) => {
  try {
    console.log("Welcome to wallet Transactions");

    const response = await userInstance.get(`/wallettransactions`, {
      params: {
        searchTerm,
        statusFilter,
        page: currentPage,
        limit: transactionsPerPage,
        sortOrder,
      },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getSaleAnalysis = async (period) => {
  try {
    console.log("Welcome to wallet Transactions");

    const response = await userInstance.get(`/getsaleschart/${period}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

//Chat

export const getAllMessages = async (providerId, bookingId, roomId) => {
  try {
    console.log("Welcome to get is booked rooms");

    const response = await userInstance.get(
      `/messages/${providerId}`,
      { bookingId: bookingId, roomId: roomId },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const saveMessage = async (providerId, bookingId, roomId) => {
  try {
    console.log("Welcome to get is booked rooms");

    const response = await userInstance.get(
      `/messages/${providerId}`,
      { bookingId: bookingId, roomId: roomId },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error in get all message", error);
    return error;
  }
};

//Pagination

export const getFilteredRoomData = async (filterdata, roomData) => {
  try {
    console.log("Welcome to get is booked rooms");

    const response = await userInstance.post(
      `/getfilterdata`,
      { filterdata, roomData },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const getuserBookingDetails = async (id) => {
  try {
    console.log("Welcome to get is booked rooms");

    const response = await userInstance.get(`/getfilterdata/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};
