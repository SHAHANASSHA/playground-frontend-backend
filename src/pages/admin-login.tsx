import { FormEvent, useEffect } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { login } from "../utils/admin.client";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
 const navigate = useNavigate();
 const submitHandler = async (e: FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const username = form.username.value;
  const password = form.password.value;
  const res = await login(username, password);
  if (res) navigate("/admin/dashboard", { replace: true });
 }
 useEffect(() => {
  if (localStorage.getItem("admintoken")) {
   navigate("/admin/dashboard", { replace: true });
  }
 }, []);
 return (
  <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
   <div className="w-full max-w-md space-y-8">
    <div className="flex flex-col items-center space-y-2 text-center">
     <h1 className="text-3xl font-bold">Admin login</h1>
    </div>

    <Card className="border-2">
     <CardHeader className="text-center">
      <CardTitle>Login</CardTitle>
     </CardHeader>
     <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 px-12 pb-4">
      <input
       className="bg-foreground h-10 rounded-sm text-background px-4"
       type="text"
       name="username"
       id="username"
       placeholder="Username"
      />
      <input
       className="bg-foreground h-10 rounded-sm text-background px-4"
       type="password"
       name="password"
       id="password"
       placeholder="Password"
      />
      <button
       className="bg-foreground h-10 rounded-sm text-background px-4"
      >
       SIGNIN
      </button>
     </form>
     <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
      <p>Secure authentication powered by GitHub</p>
      <p>No additional accounts required</p>
     </CardFooter>
    </Card>
   </div>
  </div>
 );
}