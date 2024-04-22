import { axiosInstance } from "../../api/axios";

export const adminLogin = async (email, password) => {
  try {
    console.log("Welcome to admin login")
    console.log(email,password);
    const response = await axiosInstance.post(`/admin/login`, {
      email,
      password,
    });
    console.log("...........................................")
    console.log("response", response);
    console.log(" response.data", response.data);
    console.log("response.data.msg", response.data.msg);
    console.log("........................................")
    return response
  } catch (err) {
    console.log("Error in admin login", err);
    return err
  }
};
