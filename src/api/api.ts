import axios from 'axios';
// Define API URL and Axios instance
const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});

export interface ToDoListApi {
    id?: number; // Optional for new tasks
    title: string;
    description?: string; // Optional
    status: string; // Change to TaskStatus enum
  }
  export interface Register{
    email:string;
    name:string;
    password:string;
    password_confirmation:string;
  }
  export interface Login{
    email:string;
    password:string;
  }
  // Define TaskStatus enum
 
  export const API_DATA_UPLOAD = {
    DATA_UPLOADED: false,
    TASK_DATA: [] as ToDoListApi[]
  }

