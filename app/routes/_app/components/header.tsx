import { Link, useNavigate, useRouteLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { getAuthClient } from "~/lib/auth/auth-client";

export function Header() {
  const navigate = useNavigate();
  const { user, baseURL } = useRouteLoaderData("root") as {
    user: { name: string; };
    baseURL: string;
  };
  const { signIn: signInAuth, signOut: signOutAuth } = getAuthClient({ baseURL });

  const signInGoogle = async () => {
    await signInAuth.social({
      provider: "google",
    });
  };

  const signOut = async () => {
    await signOutAuth();
    navigate("/");
  };

  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/manga" className="text-xl font-bold">
          MangaLog
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>{user.name}</span>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          ) : (
            <Button onClick={signInGoogle}>Login with Google</Button>
          )}
        </div>
      </div>
    </header>
  );
}
