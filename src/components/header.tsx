import { LogOut } from "lucide-react";
import { useContext } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GlobalContext } from "../middlewares/context";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header() {
 const { user: { data } } = useContext(GlobalContext);
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
 const username = data?.name ?? data?.username;
 return (
  <header className="mb-8 ">
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
     <h1 className="text-3xl font-bold tracking-tight">
      Welcome, {data?.name ?? data?.username}
     </h1>
     <p className="text-muted-foreground mt-1">
      Select a playground template to get started or resume your work
     </p>
    </div>

    <div className="flex items-center  gap-4">
     {/* <div className="hidden md:block">
      <div className="flex flex-col items-end">
       <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Usage</span>
        <span className="text-sm font-bold">{12}%</span>
       </div>
       <Progress value={12} className="w-32 h-2" />
      </div>
     </div> */}

     <div className="flex items-center gap-2 me-8">
      <Button
       variant="outline"
       size="sm"
       className="flex items-center gap-1"
       onClick={handleLogout}
      >
       <LogOut className="h-4 w-4" />
       Logout
      </Button>
      <Avatar>
       <AvatarImage
        src={data?.avatar_url}
        alt={username}
        className="" />
       <AvatarFallback>
        {username?.substring(0, 2).toUpperCase()}
       </AvatarFallback>
      </Avatar>
     </div>
    </div>
   </div>
  </header>
 );
}