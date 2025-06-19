import { useNavigate } from 'react-router-dom';
import axios from "axios";

function LogoutButton() {
 const navigate = useNavigate();

 const handleLogout = async () => {
  try {
   await axios.post('/api/v1/logout');

   localStorage.removeItem('token');

   navigate('/login', { replace: true });
  } catch (error) {
   console.error('Logout failed:', error);
  }
 };

 return (
  <button
   onClick={handleLogout}
   type="button"
   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
   Logout
  </button>
 );
}

export default LogoutButton;