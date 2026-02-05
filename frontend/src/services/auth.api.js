import api from "@/lib/axios";

export const registerUser = (data) => api.post("/register", data);

export const loginUser = (data) => api.post("/login", data);

export const logoutUser = () => api.post("/logout");

export const getUsers = (params) => api.get("/users", { params });

export const getMe = () => api.get("/me");
