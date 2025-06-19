import { Github } from "lucide-react";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";

function GitHubLoginButton() {
 const cid = import.meta.env.VITE_GITHUB_CLIENT_ID;
 const handleLogin = () => {
  const clientId = cid;
  const redirectUri = `${location.origin}/auth/github/callback`;
  const scope = 'read:user user:email';
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
 };

 return (
  <CardContent className="flex justify-center">
   <Button onClick={handleLogin} className="w-full max-w-xs" size="lg">
    <Github className="mr-2 h-5 w-5" />
    Sign in with GitHub
   </Button>
  </CardContent>
 );
};

export default GitHubLoginButton;
