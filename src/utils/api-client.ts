import axios, { AxiosError } from "axios";

export async function genIDClient(pg: string, pgname: string) {
 try {
  const { data: { id } } = await axios.get(`/api/v1/generate-id/${pg}/${pgname}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return { id, status: true };
 } catch (error) {
  console.log(error);
  return { status: false };
 }
}

export async function createPG(id: string) {
 try {
  const res = await axios.post(`/api/v1/playground/${id}`, {}, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return { msg: res.data.msg, status: true, details: res.data.details, code: res.status };
 } catch (error) {
  console.log(error);
  return {
   msg: (error as AxiosError<{ [key: string]: string }>).response?.data?.msg,
   status: false,
   code: (error as AxiosError<{ [key: string]: string }>).status
  };
 }
}

export async function pollPG(id: string) {
 try {
  await axios.get(`/api/v1/pg-poll/${id}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return "Success";
 } catch (error) {
  console.log(error);
  return "Error"
 }
}

export async function listPG() {
 try {
  const res = await axios.get("/api/v1/playground", {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return res.data;
 } catch (error) {
  console.log(error);
 }
}

export async function removePG(id: string) {
 try {
  await axios.delete(`/api/v1/playground/${id}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return true;
 } catch (error) {
  console.log(error);
  return false;
 }
}

export async function getIPClient(id: string) {
 try {
  const res = await axios.get(`/api/v1/get-ip/${id}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return res.data;
 } catch (error) {
  console.log(error);
 }
}

export async function check() {
 try {
  const res = await axios.get(`/api/v1/user`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return { isLoggedin: true, user: res.data };
 } catch (error) {
  console.log(error);
  return { isLoggedin: false };
 }
}

export async function checkTest(id: string, vm: string, test: string, ...args: string[]) {
 try {
  const res = await axios.get(`/api/v1/check-test/${id}/${vm}/${test}?args=${args.join(",")}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return { msg: res.data.msg, success: res.data.isPass };
 } catch (error) {
  console.log(error);
  return { msg: "Failed to validate", success: false };
 }
}

export async function verifyToken(id: string) {
 try {
  const res = await axios.post(`/api/v1/verify-token/${id}`, {}, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
   }
  });
  return {
   msg: res.data.msg,
   isVerified: false
  };
 } catch (error) {
  console.log(error);
  return {
   msg: (error as AxiosError<{ [key: string]: string }>).response?.data?.msg,
   isVerified: false
  };
 }
}