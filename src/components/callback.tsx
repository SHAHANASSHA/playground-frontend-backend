import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from "axios";
import { GlobalContext } from "../middlewares/context";

function GitHubCallback() {
 const navigate = useNavigate();
 const [queries] = useSearchParams();
 const { user, setUser } = useContext(GlobalContext);
 const code = queries.get("code");

 useEffect(() => {
  if (code) {
   axios.post(`api/v1/auth/github`, { code })
    .then(res => {
     localStorage.setItem("token", res.data.token);
     setUser({ isLoggedin: true, data: {} });
    })
    .catch((err) => {
     navigate("/login", { replace: true });
     console.error(err);
    });
  }
 }, []);

 useEffect(() => {
  if (user.isLoggedin) {
   navigate("/dashboard", { replace: true });
  }
 }, [user.isLoggedin]);

 return <div>Loading...</div>;
};

export default GitHubCallback;
