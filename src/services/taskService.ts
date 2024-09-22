import { apiCallAxios } from "@/helper/axioshelp";
interface Task {
  Title: string;
  Description: string;
  Author: string;
  user: string;
}
interface User {
  userName: string;
  email: string;
  password: string;
}
interface logUser {
  email: string;
  password: string;
}


// usersApis

export async function addUser(user: User) {
  const result = await apiCallAxios
    .post("/api/users", user)
    .then((response) => response.data);
  return result;
}

export async function getUserTask(userId: String) {
  const result = await apiCallAxios
    .get(`api/users/${userId}/tasks`)
    .then((response) => response.data);
  return result;
}

export async function getUserData(userId: String) {
  if(userId){
    const result = await apiCallAxios
    .get(`api/users/${userId}`)
    .then((response) => response.data);
  return result;
  }
}

//Works Apis

export async function deleteTask(workId: String) {
  const result = await apiCallAxios
    .delete(`/api/works/${workId}`)
    .then((response) => response.data);
  return result;
}

export async function addTask(task: Task) {
  const result = await apiCallAxios
    .post("/api/works", task)
    .then((response) => response.data);
  return result;
}

export async function updatedTask(workId: String, status: boolean) {
  try {
    const result = await apiCallAxios.patch(`/api/works/${workId}`,  { status } );
    console.log(status);
    return result; 
  } catch (error) {
    console.error("Error updating task:", error); 
  }
}


// Login Apis

export async function login(user: logUser) {
  const result = await apiCallAxios
    .post("/api/login", user)
    .then((response) => response.data);
  return result;
}
export async function isLoggedIn() {
  const result = await apiCallAxios
    .get("/api/login")
    .then((response) => response.data);
  console.log(result);
  return result;
}
export async function log_Out() {
  const result = await apiCallAxios
    .delete("/api/login")
    .then((response) => response.data);
  return result;
}
