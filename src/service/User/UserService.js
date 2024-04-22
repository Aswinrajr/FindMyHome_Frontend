import { userInstance } from "../../api/userInstance";
let token = localStorage.getItem("userAccessToken");

const newToken = JSON.parse(token);
token = newToken?.userAccessToken;

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
    console.log("Welcome to user cencel booking");

    const response = await userInstance.post(`/cancelBooking/${bookingId}`, {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
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
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user get searched room data", error);
    return error;
  }
};

//need verification
export const userAddsRoom = async (data) => {
  try {
    console.log("Welcome to user Add room");

    const response = await userInstance.post(`/addroom`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user Add room", error);
    return error;
  }
};

//need verification
export const changeUserPassword = async (data) => {
  try {
    console.log("Welcome to user change password==>",data);

    const response = await userInstance.put(`/changepassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user change password", error);
    return error;
  }
};

//need verification

export const editUserProfile = async () => {
  try {
    console.log("Welcome to user edit profile");

    const response = await userInstance.post(
      `/getuserdata`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user edit profile", error);
    return error;
  }
};

//need to check
export const userUpdateData = async (formDataToSend) => {
  try {
    console.log("Welcome to user update data");

    const response = await userInstance.put(`/updateuserdata`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user update data", error);
    return error;
  }
};

//need to check
export const editUserRoom = async (roomId) => {
  try {
    console.log("Welcome to user edit room");

    const response = await userInstance.get(`/editrooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user edit room", error);
    return error;
  }
};

//need to check
export const userUpdateRoom = async (id,data) => {
  try {
    console.log("Welcome to user save update  Room",id,data);

    const response = await userInstance.post(`/updaterooms/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user save update room", error);
    return error;
  }
};

//need to check

export const userBookingPreview = async () => {
  try {
    console.log("Welcome to user bookings");

    const response = await userInstance.post(`/getuserbookings`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user bookings", error);
    return error;
  }
};

//Need checking
export const getUserData = async () => {
  try {
    console.log("Welcome to get User Data");

    const response = await userInstance.post(`/getuserdata`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user get Data", error);
    return error;
  }
};

//need check
export const rentifyUser = async () => {
  try {
    console.log("Welcome to get User rent room");

    const response = await userInstance.post(`/userrequested`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user rent room", error);
    return error;
  }
};

//need check
export const getUsersRoom = async () => {
  try {
    console.log("Welcome to get User saved room data");

    const response = await userInstance.get(`/room`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user saved room data", error);
    return error;
  }
};

export const bookRoom = async (newData,roomId) => {
  try {
    console.log("Welcome to get User book Room");

    const response = await userInstance.post(`/bookroom/${roomId}`,newData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
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
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user booking", error);
    return error;
  }
};


export const bookRoomPage = async (roomId,data) => {
  try {
    console.log("Welcome to get User  Room preview");

    const response = await userInstance.post(`/bookrooms/${roomId}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user booking", error);
    return error;
  }
};

export const verifyBookings = async (roomId) => {
  try {
    console.log("Welcome to get User  Room preview");

    const response = await userInstance.post(`/verifybooking/${roomId}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user booking", error);
    return error;
  }
};

export const placeBookingOrder = async (bookingDetails,mode) => {
  try {
    console.log("Welcome to get User  Room preview");
    const data = {
      bookingDetails,
      mode
    }

    const response = await userInstance.post(`/placeorder`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("...........................................");
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................");
    return response;
  } catch (error) {
    console.log("Error in user booking", error);
    return error;
  }
};


