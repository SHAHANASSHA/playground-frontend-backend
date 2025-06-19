import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { check } from "../utils/api-client";
import { GlobalContext } from "./context";

export default function Auth() {
 const navigate = useNavigate();
 const { setUser } = useContext(GlobalContext);
 useEffect(() => {
  (async () => {
   if (!localStorage.getItem("token")) return;
   const res = await check();
   if (!res.isLoggedin) {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
   };
   if (!res?.user?.user?.isVerified) {
    navigate("/verify", { replace: true });
   }
   setUser({
    isLoggedin: res.isLoggedin,
    data: res?.user?.user
   });
  })();
 }, []);
 return (
  <>
   {localStorage.getItem("token") ? <Outlet /> : <Navigate to={"/login"} />}
  </>
 );
}