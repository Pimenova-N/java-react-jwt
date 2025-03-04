import axios from 'axios';
import { IFetchAuthorsRequest, IFetchAuthorRequest, ICreateAuthorRequest, IUpdateAuthorRequest, IDeleteAuthorRequest } from "../types/Author/AuthorsRequest";
import { ICreateBookRequest, IUpdateBookRequest, IDeleteBookRequest } from '../types/Book/BookRequest';
const API_BASE_URL = "http://localhost:8080/api/v1/authors";

const authorApi = axios.create({
  baseURL: API_BASE_URL,
});


authorApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
  }
)

authorApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/login';
    }
  });

// Author
export const getAuthors = async (data: IFetchAuthorsRequest) => {
  const response = await authorApi.get("", { params: data });
  return response.data;
}

export const getAuthor = async (data: IFetchAuthorRequest) => {
  const response = await authorApi.get(`/${data.id}`);
  return response.data;
}

export const createAuthor = async (data: ICreateAuthorRequest) => {
  const response = await authorApi.post("", data);
  return response.data;
}

export const updateAuthor = async (data: IUpdateAuthorRequest) => {
  const response = await authorApi.put(`/${data.id}`, data);
  return response.data;
}

export const deleteAuthor = async (data: IDeleteAuthorRequest) => {
  const response = await authorApi.delete(`/${data.id}`,);
  return response.data;
}

//Book
export const deleteBook = async (data: IDeleteBookRequest) => {
  const response = await authorApi.delete(`/${data.authorId}/books/${data.id}`);
  return response.data;
}

export const createBook = async (data: ICreateBookRequest) => {
  const response = await authorApi.post(`/${data.authorId}/books`, data);
  return response.data;
}

export const updateBook = async (data: IUpdateBookRequest) => {
  const response = await authorApi.put(`/${data.authorId}/books/${data.id}`, data);
  return response.data;
}