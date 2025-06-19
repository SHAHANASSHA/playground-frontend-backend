import toast from "react-hot-toast";
import axios from "axios";

export async function login(username: string, password: string) {
 try {
  const res = axios.post(`/api/v1/adm-login`, { username, password });
  await toast.promise(res, {
   success: e => {
    localStorage.setItem("admintoken", e.data.token);
    return e.data.msg ?? "Login success";
   },
   loading: "Logging in...",
   error: "Failed to login try again"
  });
  return true;
 } catch (error) {
  console.log(error);
  return false;
 }
}

export async function checkSession() {
 try {
  await axios.get("/api/v1/check-sesstion", {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("admintoken")}`
   }
  });
  return true;
 } catch (error) {
  console.log(error);
  return false;
 }
}

export async function getToken() {
 try {
  const res = axios.post("/api/v1/generate-token", {}, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("admintoken")}`
   }
  });
  const result = await toast.promise(res, {
   success: e => {
    return e.data.msg ?? "Token generated";
   },
   loading: "Generating token...",
   error: "Failed to generate, try again"
  });
  return result.data.id;
 } catch (error) {
  console.log(error);
  return null;
 }
}

export async function listToken() {
 try {
  const res = await axios.get("/api/v1/list-tokens", {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("admintoken")}`
   }
  });
  const list = res.data.list;
  list.reverse();
  return list;
 } catch (error) {
  console.log(error);
  return null;
 }
}

export async function deleteToken(id: string) {
 try {
  const res = axios.delete(`/api/v1/delete-token/${id}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("admintoken")}`
   }
  });
  await toast.promise(res, {
   success: e => {
    return e.data.msg ?? "Token deleted";
   },
   loading: "Deleting token...",
   error: "Failed to delete, try again"
  });
  return true;
 } catch (error) {
  console.log(error);
  return false;
 }
}