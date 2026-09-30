import axios from "axios";
import useTokenStore from "./store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const logIn = async (data) => {
  try {
    const response = await api.post("/api/users/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await api.post("/api/users/register", data);
    return response.data;
  } catch (error) {
    console.error("User creation failed:", error);
    throw error;
  }
};

export const createAuction = async (data) => {
  try {
    const response = await api.post("/api/auctions/create", data);
    return response.data;
  } catch (error) {
    console.error("Auction creation failed:", error);
    throw error;
  }
};

export const updateAuction = async (id, data) => {
  try {
    const response = await api.put(`/api/auctions/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Auction update failed:", error);
    throw error;
  }
};

export const getAuctions = async () => {
  try {
    const response = await api.get("/api/auctions");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch auctions:", error);
    throw error;
  }
};

export const getAuctionById = async (id) => {
  try {
    const response = await api.get(`/api/auctions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch auction:", error);
    throw error;
  }
};

export const getFarmerById = async (id) => {
  try {
    const response = await api.get(`/api/users/farmers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch farmer:", error);
    throw error;
  }
};

export const getVendorById = async (id) => {
  try {
    const response = await api.get(`/api/users/vendors/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vendor:", error);
    throw error;
  }
};

export const updateStatus = async (id) => {
  try {
    const response = await api.put(`/api/auctions/updatestatus/${id}`, { status: "closed" });
    return response.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};

export const createQuestion = async (data) => {
  try {
    const response = await api.post("/api/forums", data);
    return response.data;
  } catch (error) {
    console.error("Question creation failed:", error);
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const response = await api.get("/api/forums");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw error;
  }
};

export const getMyAuctions = async (id) => {
  try {
    const response = await api.get(`/api/auctions/myauctions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my auctions:", error);
    throw error;
  }
};


export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/api/users/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("User update failed:", error);
    throw error;
  }
};


export const acceptOrder = async (data) => {
  try {
    const response = await api.post(`/api/users/acceptorder`,data);
    return response.data;
  } catch (error) {
    console.error("Failed to accept order:", error);
    throw error;
  }
}

export const postComment = async (id, data) => {
  try {
    const response = await api.post(`/api/forums/comment/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("post comment error", error);
    throw error;
  }
};


export const getForumPostByid = async (id) => {
  try {
    const response = await api.get(`/api/forums/${id}`);
    return response.data;
  } catch (error) {
    console.error("get question details error", error);
    throw error;
  }
};

export const createOrder = async (data) => {
  try {
    const response = await api.post(`/api/payment/create-order`, data);
    return response.data;
  } catch (error) {
    console.error("User update failed:", error);
    throw error;
  }
};

export const getFarmProducts=async () => {
  try{
    const response = await api.get('/api/products');
    return response.data;
  }catch(error){
    console.log(error)
    throw error
  }
}