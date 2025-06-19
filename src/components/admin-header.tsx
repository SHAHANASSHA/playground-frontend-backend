import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

export default function AdminHeader() {
 const navigate = useNavigate();
 const logout = () => {
  localStorage.removeItem("admintoken");
  navigate("/admin/login", { replace: true });
 }
 return (
  <header className="mb-8 ">
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
     <h1 className="text-3xl font-bold tracking-tight">
      Welcome, admin
     </h1>
     <p className="text-muted-foreground mt-1">
      |
      {/* Select a playground template to get started or resume your work */}
     </p>
    </div>

    <div className="flex items-center  gap-4">
     <div className="flex items-center gap-2 me-8">
      <Button
       variant="outline"
       size="sm"
       className="flex items-center gap-1"
       onClick={logout}
      >
       <LogOut className="h-4 w-4" />
       Logout
      </Button>
      <Avatar>
      </Avatar>
     </div>
    </div>
   </div>
  </header>
 );
}