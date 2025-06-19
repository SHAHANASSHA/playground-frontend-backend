import { useContext, useEffect } from "react";
import GitHubLoginButton from "../components/github-button";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../middlewares/context";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function Login() {
 const navigate = useNavigate();
 const { user } = useContext(GlobalContext);
 useEffect(() => {
  if (localStorage.getItem("token")) {
   navigate('/dashboard', { replace: true });
  }
 }, [user.isLoggedin]);
 return (
  <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
   <div className="w-full max-w-md space-y-8">
    <div className="flex flex-col items-center space-y-2 text-center">
     <div className="rounded-full bg-primary/10 p-4">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
       className="h-10 w-10 text-primary"
      >
       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
       <polyline points="3.29 7 12 12 20.71 7" />
       <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
     </div>
     <h1 className="text-3xl font-bold">VM Playground</h1>
     <p className="text-muted-foreground">
      Learn, build, and experiment in virtual environments
     </p>
    </div>

    <Card className="border-2">
     <CardHeader className="text-center">
      <CardTitle>Welcome</CardTitle>
      <CardDescription>
       Sign in to access your virtual machine playgrounds
      </CardDescription>
     </CardHeader>
     <GitHubLoginButton />
     <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
      <p>Secure authentication powered by GitHub</p>
      <p>No additional accounts required</p>
     </CardFooter>
    </Card>

    <div className="text-center text-sm text-muted-foreground">
     <p>
      By signing in, you agree to our Terms of Service and Privacy Policy
     </p>
    </div>
   </div>
  </div>
 );
}