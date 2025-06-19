import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkSession } from "../utils/admin.client";

export default function AdminAuth() {
 const navigate = useNavigate();
 useEffect(() => {
  (async () => {
   if (!localStorage.getItem("admintoken")) return
   if (!(await checkSession())) {
    localStorage.removeItem("admintoken");
    navigate("/admin/login", { replace: true });
   }
  })()
 }, []);
 return (
  <>
   {localStorage.getItem("admintoken") ?
    <Outlet /> :
    <Navigate to={"/admin/login"} replace={true} />}
  </>
 );
}