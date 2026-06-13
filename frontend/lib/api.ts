import axios from "axios";

export const api = axios.create({
  baseURL: "https://ai-diagram-generator-i052.onrender.com/",
});