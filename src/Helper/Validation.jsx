

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!email.includes("@gmail.com")) return "Email must be a Gmail address";
  if (!/[a-z]/.test(email))
    return "Email must contain at least one lowercase letter";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
    return "Password must contain at least one symbol";
  return "";
};
