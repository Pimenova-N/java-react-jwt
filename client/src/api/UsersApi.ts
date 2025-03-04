import axios from 'axios';
import { IRegisterRequest, ILoginRequest} from "../types/User/User";

const API_BASE_URL = "http://localhost:8080/api/v1/auth";
const userApi = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (data: IRegisterRequest) => {
  const response = await userApi.post(`/register`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export const loginUser = async (data: ILoginRequest) => {
  const response = await userApi.post(`/login`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export const storeToken = (data: string) => {
  localStorage.setItem('token', data);
}

export const clearToken = () => {
  localStorage.removeItem('token');
}

